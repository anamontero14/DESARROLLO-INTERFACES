import { injectable, inject } from "inversify";
import * as signalR from "@microsoft/signalr";
import { TYPES } from "../../core/types";

//DataSource que maneja la conexión con SignalR
@injectable()
export class JuegoDataSource {
    private connection: signalR.HubConnection;

    constructor(@inject(TYPES.HubUrl) hubUrl: string) {
    // Configura la conexión con el hub de SignalR
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
    }

    async connect(): Promise<void> {
        let resultado: void;

        // Solo conecta si está desconectado
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            resultado = await this.connection.start();
        }

        return resultado;
    }

    async disconnect(): Promise<void> {
        const resultado = await this.connection.stop();
        return resultado;
    }

    async invoke(methodName: string, ...args: any[]): Promise<void> {
        let resultado: void;

        // Verifica que la conexión esté activa antes de invocar
        if (this.connection.state === signalR.HubConnectionState.Connected) {
            resultado = await this.connection.invoke(methodName, ...args);
        } else {
            throw new Error("No hay conexión con el servidor.");
        }

        return resultado;
    }

    on(eventName: string, callback: (...args: any[]) => void): void {
        this.connection.on(eventName, callback);
    }

    getConnectionState(): signalR.HubConnectionState {
        const estado = this.connection.state;
        return estado;
    }
}