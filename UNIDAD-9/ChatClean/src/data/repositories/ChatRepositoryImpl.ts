import { injectable, inject } from 'inversify';
import { clsMensajeUsuario } from '../../domain/entities/clsMensajeUsuario';
import { IChatRepository } from '../../domain/repositories/IChatRepository';
import { SignalRDataSource } from '../datasource/SignalRDatasource';
import { TYPES } from '../../core/types';

// marca la clase como inyectable
@injectable()
export class ChatRepositoryImpl implements IChatRepository {
  // recibe el datasource por inyección de dependencias
  constructor(@inject(TYPES.SignalRDataSource) private dataSource: SignalRDataSource) {}

  // implementa el método connect
  async connect(): Promise<void> {
    await this.dataSource.connect();
  }

  // implementa el método disconnect
  async disconnect(): Promise<void> {
    await this.dataSource.disconnect();
  }

  // implementa el método sendMessage
  async sendMessage(claseUsuario: clsMensajeUsuario): Promise<void> {
    await this.dataSource.invoke("SendMessage", claseUsuario);
  }

  // implementa el método onMessageReceived
  onMessageReceived(callback: (claseUsuario: clsMensajeUsuario) => void): void {
    this.dataSource.on("ReceiveMessage", (mensaje: clsMensajeUsuario) => {
    callback(mensaje);
    });
  }
}