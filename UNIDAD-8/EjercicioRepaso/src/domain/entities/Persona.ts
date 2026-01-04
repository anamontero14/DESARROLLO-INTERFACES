// src/domain/entities/Persona.ts

/**
 * Clase que representa una Persona
 */
export class Persona {
    //#region ATRIBUTOS PRIVADOS
    private _id: number;
    private _nombre: string;
    private _apellidos: string;
    private _telefono: string;
    private _direccion: string;
    private _foto: string;
    private _fechaNacimiento: Date;
    private _idDepartamento: number;
    //#endregion

    //#region CONSTRUCTOR COMPLETO
    constructor(
        id: number,
        nombre: string,
        apellidos: string,
        telefono: string,
        direccion: string,
        foto: string,
        fechaNacimiento: Date,
        idDepartamento: number
    ) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._direccion = direccion;
        this._foto = foto;
        this._fechaNacimiento = fechaNacimiento;
        this._idDepartamento = idDepartamento;
    }
    //#endregion

    //#region GETTERS Y SETTERS
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get apellidos(): string {
        return this._apellidos;
    }

    set apellidos(value: string) {
        this._apellidos = value;
    }

    get telefono(): string {
        return this._telefono;
    }

    set telefono(value: string) {
        this._telefono = value;
    }

    get direccion(): string {
        return this._direccion;
    }

    set direccion(value: string) {
        this._direccion = value;
    }

    get foto(): string {
        return this._foto;
    }

    set foto(value: string) {
        this._foto = value;
    }

    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value;
    }

    get idDepartamento(): number {
        return this._idDepartamento;
    }

    set idDepartamento(value: number) {
        this._idDepartamento = value;
    }
    //#endregion
}