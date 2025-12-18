/**
 * Clase que contendrá la definición de un pokemon y
 * los atributos que deberá tener
 */
export class Pokemon {

    //#region ATRIBUTOS PRIVADOS
    private _name: string
    private _url: string
    //#endregion

    //#region CONSTRUCTOR CON TODOS LOS ATRIBUTOS
    constructor(name: string, url: string) {
        this._name = name
        this._url = url
    }
    //#endregion

    //#region GETTERS/SETTERS
    get name() {
        return this._name
    }

    get url() {
        return this._url
    }
    //#endregion

}