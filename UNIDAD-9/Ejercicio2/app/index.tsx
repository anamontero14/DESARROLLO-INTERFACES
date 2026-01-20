import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Message {
  user: string;
  message: string;
}


const ChatApp = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [messageInput, setMessageInput] = useState('');


  useEffect(() => {
    // 1. Configurar la conexión
    // Reemplaza con la URL de tu App Service en Azure (ej: https://tu-app.azurewebsites.net/chatHub)
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://signalrchatmontero-a8d7byc9afetb7c4.francecentral-01.azurewebsites.net/chatHub") 
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);


  useEffect(() => {
    if (connection) {
      // 2. Iniciar la conexión
      connection.start()
        .then(() => {
          console.log('Conectado a SignalR en Azure');


          // 3. Escuchar el evento 'ReceiveMessage' (debe coincidir con tu código C#)
          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
          });
        })
        .catch(e => console.log('Error de conexión: ', e));
    }
  }, [connection]);


  const sendMessage = async () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      try {
        // 4. Llamar al método del Hub 'SendMessage' (debe coincidir con tu código C#)
        await connection.invoke("SendMessage", userInput, messageInput);
        setMessageInput('');
      } catch (e) {
        console.error(e);
      }
} else {
      alert("No hay conexión con el servidor.");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Usuario"
          value={userInput}
          onChangeText={setUserInput}
          style={styles.input}
        />
        <TextInput
          placeholder="Mensaje"
          value={messageInput}
          onChangeText={setMessageInput}
          style={styles.input}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>


      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.userText}>{item.user}:</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  messageItem: { flexDirection: 'row', marginBottom: 10 },
  userText: { fontWeight: 'bold', marginRight: 5 }
});
export default ChatApp;