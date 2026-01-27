import { injectable, inject } from 'inversify';
import { clsMensajeUsuario } from '../../domain/entities/clsMensajeUsuario';
import { ConnectToChatUseCase } from '../../domain/usecases/ConnectToChatUseCase';
import { SendMessageUseCase } from '../../domain/usecases/SendMessageUseCase';
import { SubscribeToMessagesUseCase } from '../../domain/usecases/SubscribeToMessagesUseCase';
import { TYPES } from '../../core/types';

// marca la clase como inyectable
@injectable()
export class ChatViewModel {
  // setter de react que se configurará después
  private setMessages?: React.Dispatch<React.SetStateAction<clsMensajeUsuario[]>>;

  // inyecta todos los casos de uso usando sus tokens
  constructor(
    @inject(TYPES.ConnectToChatUseCase) private connectUseCase: ConnectToChatUseCase,
    @inject(TYPES.SendMessageUseCase) private sendMessageUseCase: SendMessageUseCase,
    @inject(TYPES.SubscribeToMessagesUseCase) private subscribeUseCase: SubscribeToMessagesUseCase
  ) {}

  // configura el setter después de la construcción
  configure(setMessages: React.Dispatch<React.SetStateAction<clsMensajeUsuario[]>>): void {
    this.setMessages = setMessages;
  }

  // inicializa la conexión y suscripción
  async initialize(): Promise<void> {
    await this.connectUseCase.execute();
    
    this.subscribeUseCase.execute((message) => {
      if (this.setMessages) {
        const limpio = new clsMensajeUsuario(
          String(message.nombre),
          String(message.mensaje)
        );

        this.setMessages(prev => [...prev, limpio]);
      }
    });
  }

  // envía un mensaje
  async sendMessage(claseUsuario: clsMensajeUsuario): Promise<void> {
    await this.sendMessageUseCase.execute(claseUsuario);
  }
}