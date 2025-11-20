import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
    textoBoton: string,
    onPress: () => void
}

export function BotonProgramable({textoBoton, onPress}: Props) {
    return (
        <Pressable style={styles.boton} onPress={onPress}>
            <Text style={styles.textoBoton}>{textoBoton}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    height: 50,
    width: 170,
  },
  textoBoton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});