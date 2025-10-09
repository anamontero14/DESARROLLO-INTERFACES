import { Text, View, FlatList, StyleSheet } from "react-native";

const listado = [
  { id: 1, nombre: "Carlos", apellido: "Pérez" },
  { id: 2, nombre: "María", apellido: "Gómez" },
  { id: 3, nombre: "Juan", apellido: "Rodríguez" },
  { id: 4, nombre: "Lucía", apellido: "Fernández" },
  { id: 5, nombre: "Andrés", apellido: "Torres" },
  { id: 6, nombre: "Sofía", apellido: "López" },
  { id: 7, nombre: "Miguel", apellido: "Ramírez" },
  { id: 8, nombre: "Valentina", apellido: "Vargas" },
  { id: 9, nombre: "Diego", apellido: "Morales" },
  { id: 10, nombre: "Isabella", apellido: "Castro" },
  { id: 11, nombre: "Alejandro", apellido: "Rojas" },
  { id: 12, nombre: "Camila", apellido: "Díaz" },
  { id: 13, nombre: "Fernando", apellido: "Suárez" },
  { id: 14, nombre: "Natalia", apellido: "Mendoza" },
  { id: 15, nombre: "Ricardo", apellido: "Ortega" },
  { id: 16, nombre: "Paula", apellido: "Núñez" },
  { id: 17, nombre: "Javier", apellido: "Cruz" },
  { id: 18, nombre: "Gabriela", apellido: "Silva" },
  { id: 19, nombre: "Tomás", apellido: "Hernández" },
  { id: 20, nombre: "Laura", apellido: "Alvarez" }
];

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={listado}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nameText}>{item.nombre} {item.apellido}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Para Android
    alignItems: 'center'
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
