import { ToastAndroid } from 'react-native';
import { takeEvery, put, call, select, delay } from 'redux-saga/effects';
import { userConstants } from '../../constants';
import { ListGet } from '../actions/API.action';

export function* fetchListData() {
    try {
        const data = yield call(ListGet);
        data.data['isSelect'] = false;
        const newArr = data?.data.map(v =>
        ({
            ...v,
            isSelect: false
        }))
        yield put({
            type: userConstants.FETCH_LIST_DATA_SUCCESS,
            payload: newArr
        });
    } catch (error) {
        yield put({
            type: userConstants.FETCH_LIST_DATA_FAILURE
        });
    }
}

export function* searchListData(action) {
    const { payload } = action;
    try {
        const { app: { data } } = yield select();
        if (payload) {
            const filter_data = data.filter(function (item) {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const itemEmailData = item.email ? item.email.toUpperCase() : ''.toUpperCase();
                const t_data = payload.toUpperCase()
                return itemData.indexOf(t_data) > -1 || itemEmailData.indexOf(t_data) > -1;
            })
            yield put({
                type: userConstants.SEARCH_ITEM_SUCCESS,
                payload: filter_data
            })
        } else {
            yield put({
                type: userConstants.SEARCH_ITEM_SUCCESS,
                payload: data
            })
        }
    } catch (error) {
        yield put({
            type: userConstants.SEARCH_ITEM_FAILURE
        });
    }
}

export function* selectListData(action) {
    const { payload } = action;
    try {
        const { app: { filter_data } } = yield select();
        filter_data.map((v) => {
            if (v.id == payload.id) {
                if (v.isSelect) {
                    return v.isSelect = false
                } else {
                    return v.isSelect = true
                }
            }
        })
        yield put({
            type: userConstants.SELECT_ITEM_LIST_SUCCESS,
            payload: filter_data
        });
    } catch (error) {
        yield put({
            type: userConstants.SELECT_ITEM_LIST_FAILURE
        });
    }
}

export function* selectDeleteData(action) {
    const { payload } = action;
    try {
        const { app: { filter_data } } = yield select();
        const newarr = filter_data.filter(v =>
            v.id != payload.id
        );
        ToastAndroid.show('Delete Successfully', ToastAndroid.SHORT)
        yield put({
            type: userConstants.DELETE_ITEM_SUCCESS,
            payload: newarr
        });
    } catch (error) {
        yield put({
            type: userConstants.DELETE_ITEM_FAILURE
        });
    }
}

export function* handleModalOpen(action) {
    const { payload } = action;
    try {
        yield put({
            type: userConstants.MODAL_SUCCESS,
            payload
        });
    } catch (error) {
        yield put({
            type: userConstants.MODAL_FAILURE
        });
    }
}

export function* updateData(action) {
    const { payload } = action;
    try {
        const { app: { filter_data } } = yield select();
        filter_data.map((v) => {
            if (v.id == payload.data.id) {
                return (v.email = payload.email, v.name = payload.name)
            }
        })
        ToastAndroid.show('Update Successfully', ToastAndroid.SHORT)
        yield put({
            type:
                userConstants.UPDATE_ITEM_SUCCESS,
            payload: filter_data
        });
        yield put({
            type: userConstants.MODAL_REQUEST,
            payload: { modalOpen: false }
        })
    } catch (error) {
        yield put({
            type: userConstants.UPDATE_ITEM_FAILURE
        });
    }
}

export default function* watchToappSaga() {
    yield takeEvery(userConstants.FETCH_LIST_DATA_REQUEST, fetchListData);
    yield takeEvery(userConstants.SEARCH_ITEM_REQUEST, searchListData);
    yield takeEvery(userConstants.SELECT_ITEM_LIST_REQUEST, selectListData);
    yield takeEvery(userConstants.DELETE_ITEM_REQUEST, selectDeleteData);
    yield takeEvery(userConstants.MODAL_REQUEST, handleModalOpen);
    yield takeEvery(userConstants.UPDATE_ITEM_REQUEST, updateData);
}



