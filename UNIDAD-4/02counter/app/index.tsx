import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const Index = () => {

    //#region "Hooks"
    // variable para contar los clicks que se van sumando o restando
    const [count, setCount] = useState(0);
    // variable para contar el NUMERO de clicks
    const [countClicks, setCountClicks] = useState(0);
    //#endregion "Hooks"

    // realiza las operaciones
    const operaciones = (parametro: string) => {
      if (parametro === "sumar"){
        setCount(count + 1);
      } else if (parametro === "restar") {
        setCount(count - 1)
      }
      contar();
    }

    // Funcion que recoge el numero de clicks que se hacen
    const contar = () => {
      setCountClicks(countClicks + 1);
    }

    if (countClicks % 10 === 0 && countClicks != 0) {
    alert(`¡Enhorabuena, llevas ${countClicks} clicks`)
    }

  return (
   <View style={styles.container}>
      <Text style={styles.title}>
        Contador: {count}
      </Text>

      <Pressable onPress={() => {operaciones("sumar");}} style={styles.button}>
        <Text style={styles.buttonText}>Incrementar</Text>
        <Ionicons name="add-circle" size={24} color="white" />
      </Pressable>

      <Pressable onPress={() => {operaciones("restar");}} style={styles.button}>
        <Text style={styles.buttonText}>Decrementar</Text>
        <Ionicons name="remove-circle" size={24} color="white" />
      </Pressable>
     
    </View>
  );
}

//#region "Estilos"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});
//#endregion 


export default Index;