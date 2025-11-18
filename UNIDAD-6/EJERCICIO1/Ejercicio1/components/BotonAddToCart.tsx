import React from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';

type Props = {
    text: string;
    onClick: () => void
};

export function BotonAddToCart({ text, onClick }: Props) {
    return (
        <Pressable style={style.container} onPress={onClick}>
            <Text style={style.texto}>{text}</Text>
        </Pressable>
    );
}

const style = StyleSheet.create ({
    container : {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5aa2fa'
    },
    texto : {
        color: '#fff',
        fontWeight: 'bold'
    }
});