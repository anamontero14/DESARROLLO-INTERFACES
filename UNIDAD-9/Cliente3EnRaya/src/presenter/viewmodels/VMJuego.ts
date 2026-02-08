import { injectable, inject } from "inversify";
import { Jugada } from "../../domain/entities/Jugada";
import { Tablero } from "../../domain/entities/Tablero";
import { UseCaseJuego } from "../../domain/usecases/UseCaseJuego";
import { TYPES } from "../../core/types";

@injectable()
export class VMJuego {
    public jugadorActual: number;
    public ganador: boolean;
    public cantidadCasillasRellenas: number;
    public miSimbolo: string | null;
    public esMiTurno: boolean;
    public estadoPartida: string;
    public mensaje: string;
    public tablero: Tablero;

    private setEstadoPartida?: React.Dispatch<React.SetStateAction<string>>;
    private setMensaje?: React.Dispatch<React.SetStateAction<string>>;
    private setTablero?: React.Dispatch<React.SetStateAction<string[][]>>;
    private setEsMiTurno?: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(@inject(TYPES.UseCaseJuego) public useCase: UseCaseJuego) {
        this.jugadorActual = 0;
        this.ganador = false;
        this.cantidadCasillasRellenas = 0;
        this.miSimbolo = null;
        this.esMiTurno = false;
        this.estadoPartida = "esperando";
        this.mensaje = "Esperando oponente...";
        this.tablero = new Tablero();
    }

    configure(
        setEstadoPartida: React.Dispatch<React.SetStateAction<string>>,
        setMensaje: React.Dispatch<React.SetStateAction<string>>,
        setTablero: React.Dispatch<React.SetStateAction<string[][]>>,
        setEsMiTurno: React.Dispatch<React.SetStateAction<boolean>>
    ): void {
        this.setEstadoPartida = setEstadoPartida;
        this.setMensaje = setMensaje;
        this.setTablero = setTablero;
        this.setEsMiTurno = setEsMiTurno;
    }

    async initialize(): Promise<void> {
        await this.useCase.connect();

        this.useCase.recibirJugada((jugada: Jugada) => {
            if (jugada) {
                this.colocarJugada(jugada);
            }
        });
    }

    colocarJugada(jugada: Jugada): void {
        const fila = jugada.movimiento[0];
        const columna = jugada.movimiento[1];

        this.tablero.tablero[fila][columna] = jugada.simbolo;
        this.cantidadCasillasRellenas = this.cantidadCasillasRellenas + 1;

        if (this.setTablero) {
            this.setTablero([...this.tablero.tablero]);
        }

        let nuevoTurno = false;
        let nuevoMensaje = "";
        
        if (jugada.simbolo !== this.miSimbolo) {
            nuevoTurno = true;
            nuevoMensaje = "Tu turno";
        } else {
            nuevoTurno = false;
            nuevoMensaje = "Turno del oponente";
        }

        if (this.setEsMiTurno) {
            this.setEsMiTurno(nuevoTurno);
        }
        
        if (this.setMensaje) {
            this.setMensaje(nuevoMensaje);
        }

        // SOLO comprobar ganador si hay 5 o más casillas
        if (this.cantidadCasillasRellenas >= 5) {
            this.comprobarGanador(jugada.simbolo);
        }
    }

    comprobarGanador(simboloActual: string): void {
        const t = this.tablero.tablero;
        let gano = false;

        // Filas
        if (t[0][0] === simboloActual && t[0][1] === simboloActual && t[0][2] === simboloActual) gano = true;
        if (t[1][0] === simboloActual && t[1][1] === simboloActual && t[1][2] === simboloActual) gano = true;
        if (t[2][0] === simboloActual && t[2][1] === simboloActual && t[2][2] === simboloActual) gano = true;

        // Columnas
        if (t[0][0] === simboloActual && t[1][0] === simboloActual && t[2][0] === simboloActual) gano = true;
        if (t[0][1] === simboloActual && t[1][1] === simboloActual && t[2][1] === simboloActual) gano = true;
        if (t[0][2] === simboloActual && t[1][2] === simboloActual && t[2][2] === simboloActual) gano = true;

        // Diagonales
        if (t[0][0] === simboloActual && t[1][1] === simboloActual && t[2][2] === simboloActual) gano = true;
        if (t[0][2] === simboloActual && t[1][1] === simboloActual && t[2][0] === simboloActual) gano = true;

        // Si hay ganador
        if (gano) {
            this.ganador = true;
            this.estadoPartida = "finalizado";

            let mensajeFinal = "";
            if (simboloActual === this.miSimbolo) {
                mensajeFinal = "¡Has ganado!";
            } else {
                mensajeFinal = "Has perdido";
            }

            if (this.setMensaje) {
                this.setMensaje(mensajeFinal);
            }

            if (this.setEstadoPartida) {
                this.setEstadoPartida("finalizado");
            }

            if (this.setEsMiTurno) {
                this.setEsMiTurno(false);
            }
            
            return;
        }

        // Si no hay ganador pero el tablero está lleno = empate
        if (this.cantidadCasillasRellenas === 9) {
            this.estadoPartida = "finalizado";

            if (this.setMensaje) {
                this.setMensaje("Empate");
            }

            if (this.setEstadoPartida) {
                this.setEstadoPartida("finalizado");
            }

            if (this.setEsMiTurno) {
                this.setEsMiTurno(false);
            }
        }

        // Si no hay ganador y no está lleno, el juego CONTINÚA (no hace nada)
    }

    async enviarJugada(fila: number, columna: number): Promise<void> {
        let simboloActual = this.miSimbolo;

        if (simboloActual === null) {
            simboloActual = "";
        }

        const jugada = new Jugada([fila, columna], simboloActual);
        await this.useCase.sendJugada(jugada);
    }
}