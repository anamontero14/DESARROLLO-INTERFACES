//clase que representa una jugada para comunicarse con el servidor
export class Jugada {
    //array con las cordenadas del movimiento del usuario
    public movimiento: number[];
    //símbolo del jugador actual
    public simbolo: string;
    //constructor con el movimiento y el símbolo
    constructor(movimiento: number[], simbolo: string) {
        this.movimiento = movimiento;
        this.simbolo = simbolo;
    }
}