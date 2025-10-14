import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { IndexVM } from "../ViewModels/IndexVM";
import { Persona } from "../Models/Entities/PersonaModel";
import { useReactIndexVMAdapter } from "../Hooks/ReactIndexVMAdapter";

export default function Index() {

  const vm = new IndexVM();
  const personas: Persona[] = vm.Personas;
  const { personaSeleccionada } = useReactIndexVMAdapter(vm);

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.nameText}>Listado de personas</Text>
      </View>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => vm.personaSeleccionada = item} style={styles.itemContainer}>
            <Text style={styles.nameText}>{item.nombre} {item.apellido}</Text>
          </Pressable>
        )}
      />

      <View style={styles.selectedTextContainer}>
        <Text style={styles.selectedText}>Persona seleccionada: {personaSeleccionada?.nombre ?? "Ninguna"}</Text>
      </View>
    </View>
  );
}

//#region Styles
const styles = StyleSheet.create({

  selectedTextContainer: {
  marginTop: 20,
  alignItems: "center",
  backgroundColor: "#ffffff",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 4, // sombra en Android
  },

  selectedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32", // verde suave
  },

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