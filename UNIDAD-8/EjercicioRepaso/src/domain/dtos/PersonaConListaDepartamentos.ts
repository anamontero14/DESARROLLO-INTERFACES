// src/domain/dtos/PersonaConListaDepartamentos.ts

import { Departamento } from "../entities/Departamento";

/**
 * DTO que combina información de persona con lista de departamentos
 */
export class PersonaConListaDepartamentos {
    //#region ATRIBUTOS PRIVADOS
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listadoDepartamentos: Departamento[];
    private _idDepartamentoGuess: number;
    //#endregion

    //#region CONSTRUCTORES
    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listadoDepartamentos: Departamento[],
        idDepartamentoGuess?: number
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listadoDepartamentos = listadoDepartamentos;
        this._idDepartamentoGuess = idDepartamentoGuess ?? 0;
    }
    //#endregion

    //#region GETTERS Y SETTERS
    get nombrePersona(): string {
        return this._nombrePersona;
    }

    set nombrePersona(value: string) {
        this._nombrePersona = value;
    }

    get apellidosPersona(): string {
        return this._apellidosPersona;
    }

    set apellidosPersona(value: string) {
        this._apellidosPersona = value;
    }

    get listadoDepartamentos(): Departamento[] {
        return this._listadoDepartamentos;
    }

    set listadoDepartamentos(value: Departamento[]) {
        this._listadoDepartamentos = value;
    }

    get idDepartamentoGuess(): number {
        return this._idDepartamentoGuess;
    }

    set idDepartamentoGuess(value: number) {
        this._idDepartamentoGuess = value;
    }
    //#endregion
}