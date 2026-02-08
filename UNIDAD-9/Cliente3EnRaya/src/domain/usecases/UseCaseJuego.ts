import { injectable, inject } from "inversify";
import { IUseCaseJuego } from "../interfaces/usecases/IUseCaseJuego";
import { IRepositoryJuego } from "../interfaces/repositories/IRepositoryJuego";
import { Jugada } from "../entities/Jugada";
import { TYPES } from "../../core/types";

//caso de uso que gestiona la lógica del juego
@injectable()
export class UseCaseJuego implements IUseCaseJuego {
    constructor(
        @inject(TYPES.IRepositoryJuego) private repository: IRepositoryJuego
    ) {}

    /**
     * Método que no devuelve nada y que sólo llama al método de conectar
     * del repository que a su vez llama al de datasource
     */
    async connect(): Promise<void> {
        await this.repository.connect();
    }

    /**
     * Método que tampoco devuelve nada y que llama a la del repository
     */
    async disconnect(): Promise<void> {
        await this.repository.disconnect();
    }

    /**
     * Método al que le llega una jugada y que no devuelve nada, sino que le pasa la
     * jugada al método del repositorio
     * @param jugada Objeto Jugada que lleva todos los datos de la jugada
     */
    async sendJugada(jugada: Jugada): Promise<void> {
        await this.repository.sendJugada(jugada);
    }

    /**
     * Recibe un callback que espera una jugada y que llama al
     * método del repositorio pasándole este
     * @param callback Función que espera una jugada
     */
    recibirJugada(callback: (jugada: Jugada) => void): void {
        this.repository.recibirJugada(callback);
    }
}