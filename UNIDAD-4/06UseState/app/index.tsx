import { useState } from "react";
import { Text, View, TextInput } from "react-native";

export default function Index() {

  /*creacion del hook con la variable texto la cual
  se podrá modificar con setTexto y que actualmente tiene el
  valor ""*/
  const [texto, setTexto] = useState("")

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*
      En el text input lo que se hace es crear un place holder que es el texto
      que tiene el textInput por defecto. Value será lo que seguidamente "valga" el
      texto, es decir, lo que se muestre. Si anteriormente la variable texto
      en vez de "" hubiera tenido otro valor este se mostraría en el textInput
      en vez del placeholder. Onchange text lo que hace es crear una funcion
      inline la cual pide como parametro un nuevo texto que es el que se está introduciendo
      y que de return actualizará la variable texto con el texto que se escriba
      */}
      <TextInput placeholder="Insertar texto..." value={texto} 
      onChangeText={(nuevoTexto) => setTexto(nuevoTexto)}></TextInput>
      <Text>Has escrito: {texto}</Text>
    </View>
  );
}
