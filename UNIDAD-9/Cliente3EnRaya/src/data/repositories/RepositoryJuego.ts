import { injectable, inject } from "inversify";
import { IRepositoryJuego } from "../../domain/interfaces/repositories/IRepositoryJuego";
import { Jugada } from "../../domain/entities/Jugada";
import { JuegoDataSource } from "../datasource/JuegoDataSource";
import { TYPES } from "../../core/types";

//clase que implementa la interfaz del repositorio de juego
@injectable()
export class RepositoryJuego implements IRepositoryJuego {
    //constructor
    constructor(
        @inject(TYPES.JuegoDataSource) private dataSource: JuegoDataSource
    ) {}

    /**
     * Usa el método de connect del datasource
     */
    async connect(): Promise<void> {
        await this.dataSource.connect();
    }

    /**
     * Usa el método de disconnect del datasource
     */
    async disconnect(): Promise<void> {
        await this.dataSource.disconnect();
    }

    /**
     * Le manda al datasource el nombre del método que se tiene que ejecutar
     * junto con la jugada que ha hecho uno de los jugadores
     * @param jugada Objeto del tipo Jugada que lleva el movimiento
     *               que ha hecho uno de los jugadores
     */
    async sendJugada(jugada: Jugada): Promise<void> {
        await this.dataSource.invoke("MandarMovimiento", jugada);
    }

    /**
     * Este método permite registrar una función que se 
     * ejecutará cada vez que llegue una jugada desde el servidor
     * @param callback Parámetro que espera una función que recibe un objeto
     *                 de tipo Jugada y no devuelve nada
     */
    recibirJugada(callback: (jugada: Jugada) => void): void {
        //escucha el evento MovimientoRealizado del servidor
        this.dataSource.on("MovimientoRealizado", (jugada: Jugada) => {
            callback(jugada);
        });
    }
}