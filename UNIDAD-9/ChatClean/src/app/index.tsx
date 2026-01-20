import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VMChat } from '../presenter/viewmodel/VMChat';

export default function Index() {
  const {
    messages,
    userInput,
    setUserInput,
    messageInput,
    setMessageInput,
    sendMessage,
    isConnected
  } = VMChat();

  const handleSendMessage = async () => {
    try {
      await sendMessage();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error al enviar mensaje');
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
        <Button 
          title="Enviar" 
          onPress={handleSendMessage}
          disabled={!isConnected}
        />
        {!isConnected && <Text style={styles.statusText}>Desconectado</Text>}
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.userText}>{item.nombre}:</Text>
            <Text>{item.mensaje}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  messageItem: { flexDirection: 'row', marginBottom: 10 },
  userText: { fontWeight: 'bold', marginRight: 5 },
  statusText: { color: 'red', marginTop: 5, textAlign: 'center' }
});