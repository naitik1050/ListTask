import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../theme/colors';

export const Input = ({
    placeholder,
    containerStyle,
    onChangeText,
    value,
}) => {
    return (
        <>
            <TextInput
                style={containerStyle}
                placeholder={placeholder}
                placeholderTextColor={COLORS.black}
                defaultValue={value}
                onChangeText={onChangeText}
            />
        </>
    );
};

const styles = StyleSheet.create({
    textInputStyle: { paddingHorizontal: 10, padding: 10, paddingBottom: 2 },
    errorMessage: {
        color: COLORS.red,
        fontSize: 14,
        paddingHorizontal: 10,
    },
});
