import * as signalR from '@microsoft/signalr';
import { useState, useEffect } from 'react';
import { clsMensajeUsuario } from '@/src/domain/entities/clsMensajeUsuario';

export const useChatViewModel = () => {  // Debe llamarse useChatViewModel o VMChat
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<clsMensajeUsuario[]>([]);
  const [userInput, setUserInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://signalrchatmontero2-dhdtbvfghbdqg4b0.francecentral-01.azurewebsites.net/chatHub")
      .withAutomaticReconnect()
      .build();
    
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Conectado a SignalR en Azure');
          setIsConnected(true);

          connection.on("ReceiveMessage", (mensajeUsuario: clsMensajeUsuario) => {
            setMessages(prevMessages => [...prevMessages, mensajeUsuario]);
          });
        })
        .catch(e => {
          console.log('Error de conexión: ', e);
          setIsConnected(false);
        });

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      try {
        const mensajeUsuario = new clsMensajeUsuario(userInput, messageInput);
        
        await connection.invoke("SendMessage", mensajeUsuario);
        setMessageInput('');
      } catch (e) {
        console.error('Error al enviar mensaje: ', e);
        throw new Error('No se pudo enviar el mensaje');
      }
    } else {
      throw new Error('No hay conexión con el servidor');
    }
  };

  return {
    messages,
    userInput,
    setUserInput,
    messageInput,
    setMessageInput,
    sendMessage,
    isConnected
  };
};

// Si prefieres llamarlo VMChat, exporta así:
export const VMChat = useChatViewModel;