import { injectable, inject } from "inversify";
import { Jugada } from "../../domain/entities/Jugada";
import { Tablero } from "../../domain/entities/Tablero";
import { UseCaseJuego } from "../../domain/usecases/UseCaseJuego";
import { TYPES } from "../../core/types";

// ViewModel que gestiona el estado del juego
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

    constructor(@inject(TYPES.UseCaseJuego) private useCase: UseCaseJuego) {
        this.jugadorActual = 0;
        this.ganador = false;
        this.cantidadCasillasRellenas = 0;
        this.miSimbolo = null;
        this.esMiTurno = false;
        this.estadoPartida = "esperando";
        this.mensaje = "Esperando oponente...";
        this.tablero = new Tablero();
    }

    // Configura los setters de React después de la construcción
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

    // Inicializa la conexión y suscripciones
    async initialize(): Promise<void> {
        await this.useCase.connect();

        // Escuchar evento IniciarPartida
        this.useCase.recibirJugada((jugada: Jugada) => {
            if (jugada) {
            this.colocarJugada(jugada);
            }
        });
    }

    // Coloca una jugada en el tablero
    colocarJugada(jugada: Jugada): void {
        const fila = jugada.movimiento[0];
        const columna = jugada.movimiento[1];

        // Actualizar el tablero local
        this.tablero.tablero[fila][columna] = jugada.simbolo;
        this.cantidadCasillasRellenas = this.cantidadCasillasRellenas + 1;

        // Actualizar el estado de React
        if (this.setTablero) {
            this.setTablero([...this.tablero.tablero]);
        }

        // Cambiar el turno
        let nuevoTurno = false;
        if (jugada.simbolo !== this.miSimbolo) {
            nuevoTurno = true;
        }

        if (this.setEsMiTurno) {
            this.setEsMiTurno(nuevoTurno);
        }

        // Comprobar ganador si hay al menos 5 casillas
        if (this.cantidadCasillasRellenas >= 5) {
            this.comprobarGanador(jugada.simbolo);
        }
    }

    // Comprueba si hay un ganador
    comprobarGanador(simboloActual: string): void {
        let hayGanador = false;
        const tableroActual = this.tablero.tablero;

        // Comprobar filas
        let i = 0;
        while (i < 3 && hayGanador === false) {
            if (
            tableroActual[i][0] === simboloActual &&
            tableroActual[i][1] === simboloActual &&
            tableroActual[i][2] === simboloActual
            ) {
            hayGanador = true;
            }
            i = i + 1;
        }

        // Comprobar columnas
        let j = 0;
        while (j < 3 && hayGanador === false) {
            if (
            tableroActual[0][j] === simboloActual &&
            tableroActual[1][j] === simboloActual &&
            tableroActual[2][j] === simboloActual
            ) {
            hayGanador = true;
            }
            j = j + 1;
        }

        // Comprobar diagonal principal
        if (hayGanador === false) {
            if (
            tableroActual[0][0] === simboloActual &&
            tableroActual[1][1] === simboloActual &&
            tableroActual[2][2] === simboloActual
            ) {
            hayGanador = true;
            }
        }

        // Comprobar diagonal inversa
        if (hayGanador === false) {
            if (
            tableroActual[0][2] === simboloActual &&
            tableroActual[1][1] === simboloActual &&
            tableroActual[2][0] === simboloActual
            ) {
            hayGanador = true;
            }
        }

        // Actualizar estado si hay ganador
        if (hayGanador === true) {
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
        }

        // Comprobar empate
        if (hayGanador === false && this.cantidadCasillasRellenas === 9) {
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
    }

    // Envía una jugada al servidor
    async enviarJugada(fila: number, columna: number): Promise<void> {
        let simboloActual = this.miSimbolo;

        if (simboloActual === null) {
            simboloActual = "";
        }

        const jugada = new Jugada([fila, columna], simboloActual);
            await this.useCase.sendJugada(jugada);
    }
}