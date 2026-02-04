//clase que representa el tablero del tres en raya
export class Tablero {
    //atributo que es un array bidimensional el cuál representa
    //el tablero
    public tablero: string[][];

    //constructor vacío que inicializa el tablero vacío
    constructor() {
        //inicializa el tablero 3x3 vacío
        this.tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }
}