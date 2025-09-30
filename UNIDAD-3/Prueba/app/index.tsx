import { Button } from "@react-navigation/elements";
import { Alert, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hola mundo</Text>
      <Text>Hola</Text>
      
      <Button onPress={() => alert("Botón pulsado")}>Púlsame</Button>
      
    </View>
  );
}
