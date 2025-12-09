/**
 * Clase que contendrá la definición de una persona y
 * los atributos que deberá tener
 */
export class Persona {

    //#region ATRIBUTOS PRIVADOS
    private _id: number
    private _nombre: string
    private _apellido: string
    private _edad: number
    private _fechaNacimiento: Date
    private _direccion: string
    private _telefono: string
    private _idDepartamento: number
    private _foto: string
    //#endregion

    //#region CONSTRUCTOR CON TODOS LOS ATRIBUTOS
    constructor(id: number, nombre: string, apellido: string, edad: number, fechaNacimiento: Date, direccion: string, telefono: string, idDepartamento: number, foto: string) {
        this._id = id
        this._nombre = nombre
        this._apellido = apellido
        this._edad = edad
        this._fechaNacimiento = fechaNacimiento
        this._direccion = direccion
        this._telefono = telefono
        this._idDepartamento = idDepartamento
        this._foto = foto
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

    get fechaNacimiento() {
        return this._fechaNacimiento
    }
    set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value
    }

    get direccion() {
        return this._direccion
    }
    set direccion(value: string) {
        this._direccion = value
    }

    get telefono() {
        return this._telefono
    }
    set telefono(value: string) {
        this._telefono = value
    }

    get idDepartamento() {
        return this._idDepartamento
    }
    set idDepartamento(value: number) {
        this._idDepartamento = value
    }

    get foto() {
        return this._foto
    }
    set foto(value: string) {
        this._foto = value
    }
    //#endregion

}