import { Jugada } from "../../entities/Jugada";

//interfaz que define el contrato del repositorio de juego
export interface IRepositoryJuego {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendJugada(jugada: Jugada): Promise<void>;
    recibirJugada(callback: (jugada: Jugada) => void): void;
}