import { View, Image, Text, StyleSheet } from "react-native";

type Props = {
    cantidad: number
};

export function Carrito({cantidad}: Props) {
    return (
        <View style={style.container}>
            <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/107/107831.png'}}
            style={style.icono}>
            </Image>
            {cantidad > 0 && (
                <View style={style.contador}>
                    <Text style={style.textoContador}>{cantidad}</Text>
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        position: 'relative',
    },
    icono: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    contador: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoContador: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
})