import React from 'react';
import { Image, View, StyleSheet, Text, ImageSourcePropType } from 'react-native';

type Props = {
    name: string;
    price: number;
    image: string;
    onAddToCart: () => void
};

export function TarjetaProducto({ name, price, image, onAddToCart }: Props) {
    return (
        <View style={style.container}>
            <Image source = {{uri: image}}></Image>
            <Text style={style.texto}>{name}</Text>
            <Text style={style.texto}>€{price} EUR</Text>
        </View>
    );
}

const style = StyleSheet.create ({
    container : {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto : {
        color: '#000',
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: '50%'
    }
});