import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { IndexVM } from "../ViewModels/IndexVM";
import { Persona } from "../Models/Entities/PersonaModel";

const vm = new IndexVM();
const personas: Persona[] = vm.getPersonas();

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.nameText}>Listado de personas</Text>
      </View>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => Alert.alert(`Usuario: ${item.id} | ${item.nombre} ${item.apellido}`)} style={styles.itemContainer}>
            <Text style={styles.nameText}>{item.nombre} {item.apellido}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

//#region Styles
const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#c3e9d3ff", // fondo suave
    padding: 10,
  },

  titulo: {
    alignItems: 'center'
  },

  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5, // Android shadow
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50", // barra lateral
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 6, // 👈 espacio debajo del nombre
  },
  idText: {
    fontSize: 14,
    color: "#999999",}
});
//#endregion
