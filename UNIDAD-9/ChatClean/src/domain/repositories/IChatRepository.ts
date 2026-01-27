import { clsMensajeUsuario } from '../entities/clsMensajeUsuario';

// contrato que define qué operaciones debe tener un repositorio de chat
export interface IChatRepository {
  // conectarse al servidor de chat
  connect(): Promise<void>;
  
  // desconectarse del servidor
  disconnect(): Promise<void>;
  
  // enviar un mensaje al servidor
  sendMessage(claseUsuario: clsMensajeUsuario): Promise<void>;
  
  // suscribirse a los mensajes que llegan del servidor
  onMessageReceived(callback: (message: clsMensajeUsuario) => void): void;
}