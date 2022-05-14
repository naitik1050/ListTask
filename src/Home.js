
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { userConstants } from '../constants';
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from 'react-native-modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import Ionicons from '@expo/vector-icons/FontAwesome';
import Delete from '@expo/vector-icons/MaterialCommunityIcons';
import { Loader } from '../components/Loader';

export default function Home() {

    const dispatch = useDispatch();
    const response = useSelector(state => state.app)
    const { update_data } = response;

    const [searchText, setSearchtext] = useState([]);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    useEffect(() => {
        if (update_data != undefined) {
            setname(update_data?.name)
            setemail(update_data?.email)
        }
    }, [response])

    useEffect(() => {
        dispatch({ type: userConstants.FETCH_LIST_DATA_REQUEST })
    }, [])

    const onSearchFilter = (text) => {
        dispatch({
            type: userConstants.SEARCH_ITEM_REQUEST,
            payload: text
        })
    }

    const onCardClick = (item) => {
        dispatch({
            type: userConstants.SELECT_ITEM_LIST_REQUEST,
            payload: item
        })
    }

    const deleteRow = (item) => {
        dispatch({
            type: userConstants.DELETE_ITEM_REQUEST,
            payload: item
        })
    }

    const onLongPress = (item) => {
        const payload = { modalOpen: true, item }
        dispatch({
            type:
                userConstants.MODAL_REQUEST,
            payload
        })
    }

    const onCloseModal = () => {
        const payload = { modalOpen: false }
        dispatch({
            type: userConstants.MODAL_REQUEST,
            payload
        })
    }

    const updateData = (data) => {
        const payload = { name, email, data }
        dispatch({
            type:
                userConstants.UPDATE_ITEM_REQUEST,
            payload
        })
    }

    const _renderModalContent = () => {
        return (
            <View
                style={styles.modalContent}>
                <View
                    style={styles.wrapModalContainer}>
                    <Text
                        style={{ fontSize: 20 }}
                    >Update Data
                    </Text>
                    <Ionicons
                        name='close'
                        size={30}
                        color={COLORS.black}
                        onPress={() => onCloseModal()}
                    />
                </View>
                <Input
                    value={name}
                    onChangeText={(e) => setname(e)}
                    containerStyle={styles.textinput} />

                <Input
                    value={email}
                    onChangeText={(e) => setemail(e)}
                    containerStyle={styles.textinput} />

                <Button
                    buttonStyle={styles.button}
                    buttonTitle='Update'
                    color={COLORS.white}
                    backgroundColor={COLORS.black}
                    onButtonPress={() => updateData(update_data)}
                    loading={response?.loader} />
            </View>
        )
    };


    const renderItem = data => {
        return (
            <TouchableOpacity
                key={data.index}
                activeOpacity={1}
                onPress={() => onCardClick(data.item)}
                onLongPress={() => onLongPress(data.item)}
                style={[styles.data,
                { backgroundColor: data.item.isSelect ? COLORS.black : COLORS.white }
                ]}>
                <Text
                    style={{
                        color: data.item.isSelect ? COLORS.white : COLORS.black
                    }}>
                    {data.item.name}
                </Text>
                <Text
                    style={{
                        color: data.item.isSelect ? COLORS.white : COLORS.black
                    }}>
                    {data.item.email}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderHiddenItem = (data) => (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() =>
                deleteRow(data.item)
            }>
            <Delete
                name='delete'
                size={30}
                color={COLORS.white} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {response?.filter_data.length > 0 ?
                <>
                    <Input
                        containerStyle={styles.textinput}
                        placeholder='Search item'
                        placeholderTextColor={COLORS.black}
                        defaultValue={searchText}
                        onChangeText={(text) =>
                            onSearchFilter(text)}
                    />

                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            disableRightSwipe
                            data={response?.filter_data}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-60}
                        />
                        <Modal
                            isVisible={response?.modal_status}>
                            {_renderModalContent()}
                        </Modal>
                    </View>
                </> :
                <View
                    style={styles.loaderWrap}>
                    <Loader
                        status={response?.loader}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapModalContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10
    },
    data: {
        padding: 15,
        margin: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 1
    },
    textinput: {
        padding: 10,
        margin: 10,
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 5
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        margin: 10,
        borderRadius: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        borderRadius: 8,
        padding: 5,
        margin: 10,
    }
});
