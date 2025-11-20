import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.fondo}>
      <View style={styles.contenedorBlanco}>
        <Text style={styles.titulo}>¡Te has registrado!</Text>
        <Text style={styles.subtitulo}>
          Bienvenido a la app. Ahora puedes empezar a usarla.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorBlanco: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 40,
    width: '85%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // para Android
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
