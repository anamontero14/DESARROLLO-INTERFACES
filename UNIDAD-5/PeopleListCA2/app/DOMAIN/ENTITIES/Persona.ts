/**
 * Clase que contendrá la definición de una persona y
 * los atributos que deberá tener
 */
class Persona {

    //#region ATRIBUTOS PRIVADOS
    private _id: number
    private _nombre: string
    private _apellido: string
    private _edad: number
    //#endregion

    //#region CONSTRUCTOR CON TODOS LOS ATRIBUTOS
    constructor(id: number, nombre: string, apellido: string, edad: number ){
        this._id = id
        this._nombre = nombre
        this._apellido = apellido
        this._edad = edad
    }
    //#endregion

    //#region GETTERS/SETTERS
    get id() {
        return this._id
    }

    get nombre() {
        return this._nombre
    }
    set nombre(value: string) {
        this._nombre = value
    }

    get apellido() {
        return this._apellido
    }
    set apellido(value: string) {
        this._apellido = value
    }

    get edad() {
        return this._edad
    }
    set edad(value: number) {
        this._edad = value
    }
    //#endregion

}