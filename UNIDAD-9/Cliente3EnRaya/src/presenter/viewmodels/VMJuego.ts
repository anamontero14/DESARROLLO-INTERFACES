import { injectable, inject } from "inversify";
import { Jugada } from "../../domain/entities/Jugada";
import { Tablero } from "../../domain/entities/Tablero";
import { UseCaseJuego } from "../../domain/usecases/UseCaseJuego";
import { TYPES } from "../../core/types";

//clase viewmodel que guarda y manda todo lo que necesita la vista
@injectable()
export class VMJuego {
    //atributo que almacena el jugador actual (1/2)
    public jugadorActual: number;
    //atributo booleano que almacena si ha habido un ganador o no
    public ganador: boolean;
    //atributo que almacena el número de casillas rellenas para saber si
    //hay que empezar a buscar un ganador o no
    public cantidadCasillasRellenas: number;
    //atributo que guarda el símbolo del jugador actual
    public miSimbolo: string | null;
    //guarda si le toca mover al jugador o no
    public esMiTurno: boolean;
    //guarda el estado general del juego para la vista
    // para mostrar mensajes o controlar la UI
    public estadoPartida: string;
    //atributo que se usa para informar al jugador sobre el estado actual del juego
    public mensaje: string;
    //atributo de la clase tablero
    public tablero: Tablero;

    //atributo privado opcional que guarda la función 
    // para actualizar el estado de la partida en React
    private setEstadoPartida?: React.Dispatch<React.SetStateAction<string>>;
    //atributo privado opcional que guarda la función para actualizar el mensaje en React
    private setMensaje?: React.Dispatch<React.SetStateAction<string>>;
    //atributo privado opcional que guarda la función 
    // para actualizar el tablero en React
    private setTablero?: React.Dispatch<React.SetStateAction<string[][]>>;
    //atributo privado opcional que guarda la función 
    // para actualizar si es mi turno o no en React
    private setEsMiTurno?: React.Dispatch<React.SetStateAction<boolean>>;

    //constructor de la clase con una inyección del caso de uso
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

    /**
     * Sirve para entregarle a la clase los setters de React 
     * que se usarán para actualizar la UI
     * @param setEstadoPartida función para actualizar el estado de la partida
     * @param setMensaje función para actualizar el mensaje
     * @param setTablero función para actualizar el tablero
     * @param setEsMiTurno función para actualizar si es mi turno o no
     */
    configure(
        setEstadoPartida: React.Dispatch<React.SetStateAction<string>>,
        setMensaje: React.Dispatch<React.SetStateAction<string>>,
        setTablero: React.Dispatch<React.SetStateAction<string[][]>>,
        setEsMiTurno: React.Dispatch<React.SetStateAction<boolean>>
    ): void {
        /**
         * Guarda cada una de esas funciones en los atributos 
         * privados correspondientes de la clase para poder llamarlas 
         * después cuando cambie el juego
         */
        this.setEstadoPartida = setEstadoPartida;
        this.setMensaje = setMensaje;
        this.setTablero = setTablero;
        this.setEsMiTurno = setEsMiTurno;
    }

    /**
     * Método asíncrono llamado initialize 
     * que no devuelve nada, se usa para inicializar la
     * conexión y preparar la clase para recibir jugadas
     */
    async initialize(): Promise<void> {
        await this.useCase.connect();

        this.useCase.recibirJugada((jugada: Jugada) => {
            if (jugada) {
                this.colocarJugada(jugada);
            }
        });
    }

    /**
     * Método que sirve para poder colocar una jugada en
     * el tablero
     * @param jugada Parámetro de tipo Jugada que contiene
     *               toda la información pertinente
     */
    colocarJugada(jugada: Jugada): void {
        //extrae la fila y columna de la jugada
        const fila = jugada.movimiento[0];
        const columna = jugada.movimiento[1];

        //coloca el símbolo del jugador en la posición correspondiente 
        //del tablero
        this.tablero.tablero[fila][columna] = jugada.simbolo;

        //cuenta todas las casillas rellenas directamente del tablero
        //sirve para saber si se puede empezar a comprobar un ganador
        let casillasContadas = 0;
        let i = 0;
        while (i < 3) {
            let j = 0;
            while (j < 3) {
                if (this.tablero.tablero[i][j] !== "") {
                    casillasContadas = casillasContadas + 1;
                }
                j = j + 1;
            }
            i = i + 1;
        }
        //actualiza la cantidad de casillas rellenas
        this.cantidadCasillasRellenas = casillasContadas;

        //si existe el setter de React para actualizar el tablero
        //se llama para refrescar la UI
        if (this.setTablero) {
            this.setTablero([...this.tablero.tablero]);
        }

        //determina el turno y mensaje a mostrar
        let nuevoTurno = false;
        let nuevoMensaje = "";

        if (jugada.simbolo !== this.miSimbolo) {
            //si la jugada NO es del jugador actual ahora es nuestro turno
            nuevoTurno = true;
            nuevoMensaje = "Tu turno";
        } else {
            //si la jugada es del jugador actual ahora es turno del oponente
            nuevoTurno = false;
            nuevoMensaje = "Turno del oponente";
        }

        //actualiza el turno en la UI si existe el setter
        if (this.setEsMiTurno) {
            this.setEsMiTurno(nuevoTurno);
        }

        //actualiza el mensaje en la UI si existe el setter
        if (this.setMensaje) {
            this.setMensaje(nuevoMensaje);
        }

        //solo se empieza a comprobar si hay un ganador si hay 5 o más casillas
        //rellenas
        if (this.cantidadCasillasRellenas >= 5) {
            this.comprobarGanador(jugada.simbolo);
        }
    }

    /**
     * Función que sirve para comprobar si el jugador actual ha ganado o no
     * @param simboloActual El símbolo del jugador actual
     * @returns 
     */
    comprobarGanador(simboloActual: string): void {
        //referencia al tablero
        const t = this.tablero.tablero;
        //variable auxiliar que sirve para saber si alguien ha ganado o no
        let gano = false;

        //SE EMPIEZAN A COMPROBAR LAS FILAS Y LAS COLUMNAS EN BUSCA DE UN GANADOR
        //filas
        if (t[0][0] === simboloActual && t[0][1] === simboloActual && t[0][2] === simboloActual) gano = true;
        if (t[1][0] === simboloActual && t[1][1] === simboloActual && t[1][2] === simboloActual) gano = true;
        if (t[2][0] === simboloActual && t[2][1] === simboloActual && t[2][2] === simboloActual) gano = true;
        //columnas        
        if (t[0][0] === simboloActual && t[1][0] === simboloActual && t[2][0] === simboloActual) gano = true;
        if (t[0][1] === simboloActual && t[1][1] === simboloActual && t[2][1] === simboloActual) gano = true;
        if (t[0][2] === simboloActual && t[1][2] === simboloActual && t[2][2] === simboloActual) gano = true;
        //diagonales
        if (t[0][0] === simboloActual && t[1][1] === simboloActual && t[2][2] === simboloActual) gano = true;
        if (t[0][2] === simboloActual && t[1][1] === simboloActual && t[2][0] === simboloActual) gano = true;

        //si se ha encontrado un ganador
        if (gano) {
            //se pone jugador a true y se finaliza la partida
            this.ganador = true;
            this.estadoPartida = "finalizado";

            //se crea una variable para mostrar el mensaje al jugador
            let mensajeFinal = "";
            //se le mostrará un mensaje diferente dependiendo de si
            //es el jugador actual o no
            if (simboloActual === this.miSimbolo) {
                mensajeFinal = "¡Has ganado!";
            } else {
                mensajeFinal = "Has perdido";
            }

            //se actualiza el mensaje de la ui
            if (this.setMensaje) {
                this.setMensaje(mensajeFinal);
            }

            //se actualiza el estado de la partida en la ui
            if (this.setEstadoPartida) {
                this.setEstadoPartida("finalizado");
            }

            //se bloquean los turnos para que nadie pueda mover
            //por haber acabado la partida
            if (this.setEsMiTurno) {
                this.setEsMiTurno(false);
            }
            
            //se termina la ejecución para no comprobar un empate
            return;
        }

        //si no ha ganado nadie PERO el tablero está lleno significa que
        //ha habido un empate
        if (this.cantidadCasillasRellenas === 9) {
            //el estado de la partida pasa a ser finalizado
            this.estadoPartida = "finalizado";

            //se muestra el mensaje de empate en la ui
            if (this.setMensaje) {
                this.setMensaje("Empate");
            }

            //se actualiza el estado de la partida en la ui
            if (this.setEstadoPartida) {
                this.setEstadoPartida("finalizado");
            }

            //se bloquea el turno para que no se mueva nadie
            if (this.setEsMiTurno) {
                this.setEsMiTurno(false);
            }
        }
    }

    /**
     * Función que consiste en enviar una jugada
     * @param fila Número de la fila
     * @param columna Número de la columna
     */
    async enviarJugada(fila: number, columna: number): Promise<void> {
        //el simbolo que se coloque será el símbolo actual
        let simboloActual = this.miSimbolo;

        //si el símbolo actual es null
        if (simboloActual === null) {
            //se iguala a una cadena vacía
            simboloActual = "";
        }

        //se crea un objeto de tipo Jugada con los atributos correspondientes
        const jugada = new Jugada([fila, columna], simboloActual);
        //se le envía al caso de uso
        await this.useCase.sendJugada(jugada);
    }
}