import { Jugada } from "../../entities/Jugada";

//interfaz que define el contrato del caso de uso de juego
export interface IUseCaseJuego {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendJugada(jugada: Jugada): Promise<void>;
    recibirJugada(callback: (jugada: Jugada) => void): void;
}