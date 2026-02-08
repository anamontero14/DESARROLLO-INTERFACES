import { injectable, inject } from "inversify";
import * as signalR from "@microsoft/signalr";
import { TYPES } from "../../core/types";

//clase que maneja la conexión con SignalR
@injectable()
export class JuegoDataSource {
    //guarda la conexión en una variable privada
    private connection: signalR.HubConnection;
    /**
     * Constructor al que le llega la url del hub para crear
     * la conexión con signal r correctamente
     * @param hubUrl URL de la conexión al servidor
     */
    constructor(@inject(TYPES.HubUrl) hubUrl: string) {
    //configura la conexión con signal r
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
    }

    /**
     * Función asíncrona que les sirve a los clientes para conectarse con el
     * servidor
     */
    async connect(): Promise<void> {
        //si el estado de la conexión es desconectado
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            //entonces se llama al método start para arrancar la conexión
            await this.connection.start();
        }
    }

    /**
     * Función asíncrona para poder desconectarse
     */
    async disconnect(): Promise<void> {
        await this.connection.stop();
    }

    /**
     * Función que promete ningún valor. Básicamente llama a un método del servidor
     * y termina cuando el servidor responde
     * @param methodName Nombre del método del hud al que se quiere llamar
     * @param args Indica cualquier cantidad de parámetros que se le pasand al
     * hud
     */
    async invoke(methodName: string, ...args: any[]): Promise<void> {
        //si no hay ninguna conexión
        if (this.connection.state !== signalR.HubConnectionState.Connected) {
            //se manda un error
            throw new Error("No hay conexión con el servidor.");
        }
        //y se llama a la función de conexión
        await this.connection.invoke(methodName, ...args);
    }

    /**
     * Este método permite al cliente reaccionar cuando el 
     * servidor emite un evento con un nombre determinado
     * @param eventName Nombre del evento
     * @param callback función que se ejecutará cuando el evento llegue
     * con cualquier cantidad de argumentos
     */
    on(eventName: string, callback: (...args: any[]) => void): void {
        this.connection.on(eventName, callback);
    }

    /**
     * Este método te dice en qué estado está actualmente la conexión con el servidor
     * @returns Devuelve el valor de estado al código que llamó al método
     */
    getConnectionState(): signalR.HubConnectionState {
        const estado = this.connection.state;
        return estado;
    }
}