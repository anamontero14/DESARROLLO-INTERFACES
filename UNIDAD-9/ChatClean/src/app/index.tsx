import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clsMensajeUsuario } from '../domain/entities/clsMensajeUsuario';
import { ChatViewModel } from '../presenter/viewmodel/ChatViewModel';
// importa directamente desde los archivos
import { container } from '../core/container';
import { TYPES } from '../core/types';

const ChatApp = () => {
  // estado para la lista de mensajes
  const [messages, setMessages] = useState<clsMensajeUsuario[]>([]);
  // estado para el input del usuario
  const [userInput, setUserInput] = useState('');
  // estado para el input del mensaje
  const [messageInput, setMessageInput] = useState('');
  
  // obtiene el viewmodel del contenedor
  const [viewModel] = useState(() => {
    // le pide al contenedor una instancia de ChatViewModel
    const vm = container.get<ChatViewModel>(TYPES.ChatViewModel);
    // configura el setter de mensajes
    vm.configure(setMessages);
    return vm;
  });

  // efecto que se ejecuta al montar el componente
  useEffect(() => {
    // inicializa la conexión y suscripción
    viewModel.initialize().catch(e => console.log('Error de conexión: ', e));
  }, []);

  // función manejadora del botón enviar
  const sendMessage = async () => {
    try {
      // construyes el objeto clsMensajeUsuario
      const usuario = new clsMensajeUsuario(userInput, messageInput);

      // llamas al viewmodel con el objeto
      await viewModel.sendMessage(usuario);
      console.log('Dentro de sendMessage en la vista: ', usuario)

      // limpias el input del mensaje
      setMessageInput('');
    } catch (e: any) {
      alert(e.message);
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* contenedor de los inputs */}
      <View style={styles.inputContainer}>
        {/* input para el nombre de usuario */}
        <TextInput
          placeholder="Usuario"
          value={userInput}
          onChangeText={setUserInput}
          style={styles.input}
        />
        {/* input para el mensaje */}
        <TextInput
          placeholder="Mensaje"
          value={messageInput}
          onChangeText={setMessageInput}
          style={styles.input}
        />
        {/* botón para enviar */}
        <Button title="Enviar" onPress={sendMessage} />
      </View>

      {/* lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          console.log("ITEM RECIBIDO EN FLATLIST DE LA VISTA:", item);
          return (
            <View style={styles.messageItem}>
              <Text style={styles.userText}>{item.nombre}:</Text>
              <Text>{item.mensaje}</Text>
            </View>
          );
        }}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  
  inputContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  } as ViewStyle,
  
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  } as TextStyle,
  
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  } as ViewStyle,
  
  userText: {
    fontWeight: 'bold',
  } as TextStyle,
});

export default ChatApp;