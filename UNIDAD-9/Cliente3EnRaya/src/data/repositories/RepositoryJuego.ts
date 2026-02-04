import { injectable, inject } from "inversify";
import { IRepositoryJuego } from "../../domain/interfaces/repositories/IRepositoryJuego";
import { Jugada } from "../../domain/entities/Jugada";
import { JuegoDataSource } from "../datasource/JuegoDataSource";
import { TYPES } from "../../core/types";

// Implementación del repositorio de juego
@injectable()
export class RepositoryJuego implements IRepositoryJuego {
    constructor(
        @inject(TYPES.JuegoDataSource) private dataSource: JuegoDataSource
    ) {}

    async connect(): Promise<void> {
        await this.dataSource.connect();
    }

    async disconnect(): Promise<void> {
        await this.dataSource.disconnect();
    }

    async sendJugada(jugada: Jugada): Promise<void> {
        await this.dataSource.invoke("MandarMovimiento", jugada);
    }

    recibirJugada(callback: (jugada: Jugada) => void): void {
        // Escucha el evento MovimientoRealizado del servidor
        this.dataSource.on("MovimientoRealizado", (jugada: Jugada) => {
            callback(jugada);
        });
    }
}