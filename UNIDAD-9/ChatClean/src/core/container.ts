// importa reflect-metadata PRIMERO (requerido por inversify)
import 'reflect-metadata';
// importa el contenedor de inversify
import { Container } from 'inversify';
// importa los tokens
import { TYPES } from './types';

// ========== IMPORTS DE DATA LAYER ==========
// datasource de signalr
import { SignalRDataSource } from '../data/datasource/SignalRDatasource';
// interfaz del repositorio
import { IChatRepository } from '../domain/repositories/IChatRepository';
// implementación del repositorio
import { ChatRepositoryImpl } from '../data/repositories/ChatRepositoryImpl';

// ========== IMPORTS DE DOMAIN LAYER ==========
// casos de uso
import { ConnectToChatUseCase } from '../domain/usecases/ConnectToChatUseCase';
import { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';
import { SubscribeToMessagesUseCase } from '../domain/usecases/SubscribeToMessagesUseCase';

// ========== IMPORTS DE APP LAYER (UI) ==========
// viewmodel del chat
import { ChatViewModel } from '../presenter/viewmodel/ChatViewModel';

// crea una nueva instancia del contenedor
const container = new Container();

// ========== CONFIGURACIÓN ==========
// registra la url del hub como una constante
// toConstantValue: siempre devuelve el mismo valor
container.bind<string>(TYPES.HubUrl).toConstantValue(
  "https://signalrchatmontero2-dhdtbvfghbdqg4b0.francecentral-01.azurewebsites.net/chatHub"
);

// ========== DATA SOURCES ==========
// registra signalrdatasource como singleton
// inSingletonScope: solo se crea UNA instancia para toda la app
// esto es importante porque queremos una sola conexión de signalr
container.bind<SignalRDataSource>(TYPES.SignalRDataSource)
  .to(SignalRDataSource)
  .inSingletonScope();

// ========== REPOSITORIES ==========
// registra el repositorio ligado a su interfaz
// cuando alguien pida IChatRepository, le damos ChatRepositoryImpl
// inSingletonScope: una sola instancia para toda la app
container.bind<IChatRepository>(TYPES.IChatRepository)
  .to(ChatRepositoryImpl)
  .inSingletonScope();

// ========== USE CASES ==========
// registra el caso de uso de conexión
// sin scope: se crea una nueva instancia cada vez que se pide
container.bind<ConnectToChatUseCase>(TYPES.ConnectToChatUseCase)
  .to(ConnectToChatUseCase);

// registra el caso de uso de envío de mensajes
container.bind<SendMessageUseCase>(TYPES.SendMessageUseCase)
  .to(SendMessageUseCase);

// registra el caso de uso de suscripción
container.bind<SubscribeToMessagesUseCase>(TYPES.SubscribeToMessagesUseCase)
  .to(SubscribeToMessagesUseCase);

// ========== VIEW MODELS ==========
// registra el viewmodel del chat
// sin scope: nueva instancia por cada vista que lo necesite
container.bind<ChatViewModel>(TYPES.ChatViewModel)
  .to(ChatViewModel);

// exporta el contenedor configurado
export { container };