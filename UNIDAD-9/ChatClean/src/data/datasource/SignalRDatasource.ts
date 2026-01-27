import { injectable, inject } from 'inversify';
import * as signalR from '@microsoft/signalr';
import { TYPES } from '../../core/types';

// marca la clase como inyectable
@injectable()
export class SignalRDataSource {
  // objeto de conexión de SignalR
  private connection: signalR.HubConnection;

  // recibe la URL del hub por inyección
  constructor(@inject(TYPES.HubUrl) hubUrl: string) {
    // configura el builder de conexión con la URL proporcionada
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
  }

  // inicia la conexión con el servidor
  async connect(): Promise<void> {
    // verifica que no esté ya conectado
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      await this.connection.start();
    }
  }

  // cierra la conexión con el servidor
  async disconnect(): Promise<void> {
    await this.connection.stop();
  }

  // invoca un método del hub en el servidor
  async invoke(methodName: string, ...args: any[]): Promise<void> {
    // verifica que la conexión esté activa
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke(methodName, ...args);
    } else {
      throw new Error("No hay conexión con el servidor.");
    }
  }

  // registra un manejador para un evento del servidor
  on(eventName: string, callback: (...args: any[]) => void): void {
    this.connection.on(eventName, callback);
  }

  // obtiene el estado actual de la conexión
  getConnectionState(): signalR.HubConnectionState {
    return this.connection.state;
  }
}