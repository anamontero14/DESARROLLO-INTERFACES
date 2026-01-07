// src/presenter/models/PersonaConListaDepartamentosYColor.ts

import { makeAutoObservable } from "mobx";
import { Departamento } from "../../domain/entities/Departamento";

/**
 * Modelo para la presentación que incluye color
 */
export class PersonaConListaDepartamentosYColor {
    //#region ATRIBUTOS PRIVADOS
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listadoDepartamentos: Departamento[];
    private _idDepartamentoGuess: number;
    private _color: string;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listadoDepartamentos: Departamento[],
        idDepartamentoGuess: number,
        color: string
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listadoDepartamentos = listadoDepartamentos;
        this._idDepartamentoGuess = idDepartamentoGuess;
        this._color = color;
        
        // Hacer esta instancia observable
        makeAutoObservable(this);
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

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }
    //#endregion
}