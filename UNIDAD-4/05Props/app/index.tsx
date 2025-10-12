import { Pressable, Text, View, StyleSheet, StyleProp, ViewStyle, Alert } from "react-native";

//le indico que el texto tiene ser un string
type Props = {
  texto: string
  style?: StyleProp<ViewStyle>
}

const Boton : React.FC<Props> = ({ texto}) => {
  return (
    <Pressable style={styles.pressableChulo} onPress={() => Alert.alert("Botón pulsado")}>
      <Text style={styles.pressableText}>{texto}</Text>
      </Pressable>
  )
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Boton texto="Primero"/>
      <Boton texto="Segundo"/>
      <Boton texto="Tercero"/>
      <Boton texto="Cuarto"/>
    </View>
  );
}

export const styles = StyleSheet.create({
  pressableChulo: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#4CAF50", // verde llamativo
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // para Android
    alignItems: "center",
    margin: 3
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
