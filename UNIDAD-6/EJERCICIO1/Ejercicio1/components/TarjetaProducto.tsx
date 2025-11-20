import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
 
type Props = {
    name: string;
    price: number;
    image: string;
    onAddToCart: () => void;
    children?: React.ReactNode; 
};

export function TarjetaProducto({ name, price, image, onAddToCart, children }: Props) {
    return (
        <View style={style.container}>
            <Image source = {{ uri: image }} style={style.image}></Image>
            <Text style={style.texto}>{name}</Text>
            <Text style={style.texto}>€{price} EUR</Text>
            {children}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between', // espacio entre imagen, texto y botón
        width: 200,
        height: 270, // un poco más alto para caber el botón
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // para Android
    },
    texto: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    image: {
        width: '60%',
        height: '50%',
        resizeMode: 'contain',
        marginBottom: 10,
    },
});

