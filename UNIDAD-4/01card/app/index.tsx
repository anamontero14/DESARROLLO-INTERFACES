import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    // Contenedor carta
    <View style={styles.contenedor}>
      
      <View style={styles.carta}>
        <Image style={styles.imagen} source={require('../assets/images/fernando-temu.png')}></Image>
        <Text style={styles.texto}>Fernando Galiana</Text>
      </View>

    </View>
    
  );
}

// Estilos 
const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  carta: {
    width: 350,
    height: 200,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 20
  },

  imagen: {
    width: 110,
    height:110,
    borderRadius: 60,
  }
});
