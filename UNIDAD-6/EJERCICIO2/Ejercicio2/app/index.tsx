import { View, StyleSheet, Text, TextInput, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";
import { BotonProgramable } from "@/components/BotonProgramable";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <ImageBackground
      source={{uri: 'https://i.pinimg.com/originals/47/88/a8/4788a805013eeb40e8c5ba6e0647c0c4.jpg'}}
      style={styles.fondo}
      blurRadius={6} 
      resizeMode="cover">
        
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.appNombre}>Aplicación chula</Text>
      </View>

      {/* Contenedor blanco */}
      <View style={styles.contenedorBlanco}>
        <Text style={styles.titulo}>Ingresar</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="orange" style={styles.icono} />
          <TextInput placeholder="Usuario" style={styles.input} editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="eye" size={24} color="orange" style={styles.icono} />
          <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry editable={false} />
        </View>

        <BotonProgramable textoBoton="Entrar" onPress={goToRegister} />

        <Text style={styles.textoRegistro}>
          ¿No tienes cuenta? <Text style={styles.linkRegistro}>Regístrate</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
  header: {
    position: 'absolute',
    top: 80,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appNombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  contenedorBlanco: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  textoRegistro: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  linkRegistro: {
    color: 'orange',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
