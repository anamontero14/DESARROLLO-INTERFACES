import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Index() {

  /*Creo dos hook que corresponderán al estado de cargado y cargando
  los cuales están ambos en false pues porque todavía ni se ha cargado
  nada ni se está cargando nada*/
  const [cargando, setCargando] = useState(false)
  const [cargado, setCargado] = useState(false)

  /*Seguidamente se crea la funcion manejarRecarga
  la cual lo que hace es ACTUALIZAR las variables
  anteriormente creadas en los hook. Como se está cargando
  pues cargando pasa a ser true y cargado pasa a ser false*/
  const manejarRecarga = () => {
    setCargando(true)
    setCargado(false)
    /*Set timeout lo que nos permite es crear una funcion
    la cual se ejecutará en el tiempo que nosotros le indiquemos.
    Por ejemplo en este caso setTimeout lo que hace es
    actualizar las variables a sus valores correspondientes
    después de que pase cierto tiempo indicado en milisegundos*/
    setTimeout(() => {
      setCargando(false)
      setCargado(true)
    }, 2000);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={manejarRecarga}>
        <Ionicons name="reload" size={24} color="blue" />
      </Pressable>

      {cargando && <ActivityIndicator size="large" color="blue" />}

      {cargado && <Text>Cargado con éxito</Text>}

    </View>
  );
}