// tokens únicos para identificar cada dependencia en el contenedor
// usamos Symbol.for() para crear identificadores globales únicos
export const TYPES = {
  // ========== CONFIGURACIÓN ==========
  // url del hub de signalr
  HubUrl: Symbol.for("HubUrl"),
  
  // ========== DATA SOURCES ==========
  // fuente de datos de signalr
  SignalRDataSource: Symbol.for("SignalRDataSource"),
  
  // ========== REPOSITORIES ==========
  // repositorio de chat (usamos la interfaz, no la implementación)
  IChatRepository: Symbol.for("IChatRepository"),
  
  // ========== USE CASES ==========
  // caso de uso para conectarse al chat
  ConnectToChatUseCase: Symbol.for("ConnectToChatUseCase"),
  // caso de uso para enviar mensajes
  SendMessageUseCase: Symbol.for("SendMessageUseCase"),
  // caso de uso para suscribirse a mensajes
  SubscribeToMessagesUseCase: Symbol.for("SubscribeToMessagesUseCase"),
  
  // ========== VIEW MODELS ==========
  // viewmodel del chat
  ChatViewModel: Symbol.for("ChatViewModel"),
};