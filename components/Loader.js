import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { COLORS } from '../theme/colors'

export const Loader = ({
    status
}) => {
    return (
        <View>
            {status ?
                <ActivityIndicator
                    size={25}
                    color={COLORS.mainColor}
                    style={styles.spinner} />
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    spinner: {
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 100
    }
})
