import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export const Button = (
    {
        onButtonPress,
        buttonTitle,
        backgroundColor,
        color,
        buttonStyle,
        loading
    }
) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onButtonPress}
            style={[buttonStyle, { backgroundColor: backgroundColor }]}>
            {loading ? <ActivityIndicator color={color} style={styles.textRegister} /> :
                <Text style={[styles.textRegister, { color: color }]}>{buttonTitle}</Text>}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    textRegister: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10
    }
});