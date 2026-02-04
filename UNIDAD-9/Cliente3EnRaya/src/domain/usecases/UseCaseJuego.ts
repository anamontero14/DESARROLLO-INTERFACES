import { injectable, inject } from "inversify";
import { IUseCaseJuego } from "../interfaces/usecases/IUseCaseJuego";
import { IRepositoryJuego } from "../interfaces/repositories/IRepositoryJuego";
import { Jugada } from "../entities/Jugada";
import { TYPES } from "../../core/types";

// Caso de uso que gestiona la lógica del juego
@injectable()
export class UseCaseJuego implements IUseCaseJuego {
    constructor(
        @inject(TYPES.IRepositoryJuego) private repository: IRepositoryJuego
    ) {}

    async connect(): Promise<void> {
        await this.repository.connect();
    }

    async disconnect(): Promise<void> {
        await this.repository.disconnect();
    }

    async sendJugada(jugada: Jugada): Promise<void> {
        await this.repository.sendJugada(jugada);
    }

    recibirJugada(callback: (jugada: Jugada) => void): void {
        this.repository.recibirJugada(callback);
    }
}