import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

//vista 1 en la que solo hay un botón para iniciar la partida
export default function V1IniciarPartida() {
  //se crea una constante de router para poder hacer uso de la navegación
  const router = useRouter();

  //esta es la función que se va a ejecutar cuando 
  //el jugador quiera iniciar la partida
  const handleIniciarPartida = () => {
    router.push("/views/V2Juego");
  };

  //#region VISTA
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tres en Raya</Text>
      <Text style={styles.subtitulo}>Juego multijugador con SignalR</Text>
      
      <TouchableOpacity style={styles.boton} onPress={handleIniciarPartida}>
        <Text style={styles.textoBoton}>Iniciar Partida</Text>
      </TouchableOpacity>
    </View>
  );
  //#endregion
}

//#region ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  titulo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#eee",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 50,
  },
  boton: {
    backgroundColor: "#0f3460",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textoBoton: {
    color: "#eee",
    fontSize: 20,
    fontWeight: "bold",
  },
});
//#endregion