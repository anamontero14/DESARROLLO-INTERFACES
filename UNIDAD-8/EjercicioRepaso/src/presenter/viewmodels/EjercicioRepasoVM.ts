// src/presenter/viewmodels/EjercicioRepasoVM.ts

import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { IUseCasePersona } from "../../domain/interfaces/usecases/IUseCasePersona";
import { IUseCaseJuego } from "../../domain/interfaces/usecases/IUseCaseJuego";
import { PersonaConListaDepartamentosYColor } from "../models/PersonaConListadoDepartamentosYColor";
import { PersonaConListaDepartamentos } from "../../domain/dtos/PersonaConListaDepartamentos";
import { TYPES } from "../../core/types";

/**
 * ViewModel para el juego de adivinar departamentos
 */
@injectable()
export class EjercicioRepasoVM {
    private _personasConDepartamentosList: PersonaConListaDepartamentosYColor[];
    private _isLoading: boolean;
    private _error: string | null;
    private _aciertos: number | null;
    private _hasGanado: boolean;
    private _casoDeUsoPersona: IUseCasePersona;
    private _casoDeUsoJuego: IUseCaseJuego;

    constructor(
        @inject(TYPES.IUseCasePersona) casoDeUsoPersona: IUseCasePersona,
        @inject(TYPES.IUseCaseJuego) casoDeUsoJuego: IUseCaseJuego
    ) {
        this._personasConDepartamentosList = [];
        this._isLoading = false;
        this._error = null;
        this._aciertos = null;
        this._hasGanado = false;
        this._casoDeUsoPersona = casoDeUsoPersona;
        this._casoDeUsoJuego = casoDeUsoJuego;

        makeAutoObservable(this);
    }

    //#region GETTERS
    get personasConDepartamentosList(): PersonaConListaDepartamentosYColor[] {
        return this._personasConDepartamentosList;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): string | null {
        return this._error;
    }

    get aciertos(): number | null {
        return this._aciertos;
    }

    get hasGanado(): boolean {
        return this._hasGanado;
    }
    //#endregion

    //#region MÉTODOS PÚBLICOS
    /**
     * Carga inicial de personas con departamentos
     */
    async cargarPersonasConDepartamentos(): Promise<void> {
        this._isLoading = true;
        this._error = null;

        try {
            const personasDTO = await this._casoDeUsoPersona.getPersonas();
            const colores = this.generarColoresPorDepartamento(personasDTO);
            const personasConColor: PersonaConListaDepartamentosYColor[] = [];

            for (const personaDTO of personasDTO) {
                const idDepartamento = this.obtenerIdDepartamentoReal(personaDTO);
                const color = colores[idDepartamento] || "#FFFFFF";
                
                const personaConColor = new PersonaConListaDepartamentosYColor(
                    personaDTO.nombrePersona,
                    personaDTO.apellidosPersona,
                    personaDTO.listadoDepartamentos,
                    0,
                    color
                );
                
                personasConColor.push(personaConColor);
            }

            this._personasConDepartamentosList = personasConColor;
        } catch (error) {
            this._error = error instanceof Error ? error.message : "Error desconocido";
        } finally {
            this._isLoading = false;
        }
    }

    /**
     * Actualiza la selección de departamento de una persona
     */
    actualizarSeleccionDepartamento(index: number, idDepartamento: number): void {
        if (index >= 0 && index < this._personasConDepartamentosList.length) {
            this._personasConDepartamentosList[index].idDepartamentoGuess = idDepartamento;
        }
    }

    /**
     * Comprueba las respuestas del usuario
     */
    async comprobarRespuestas(): Promise<void> {
        this._isLoading = true;
        this._error = null;

        try {
            const personasDTO = this.convertirADTO(this._personasConDepartamentosList);
            const aciertosObtenidos = await this._casoDeUsoJuego.comprobarAciertos(personasDTO);
            
            this._aciertos = aciertosObtenidos;
            this._hasGanado = aciertosObtenidos === this._personasConDepartamentosList.length;
        } catch (error) {
            this._error = error instanceof Error ? error.message : "Error al comprobar respuestas";
        } finally {
            this._isLoading = false;
        }
    }

    /**
     * Reinicia el juego
     */
    reiniciarJuego(): void {
        this._aciertos = null;
        this._hasGanado = false;
        this._error = null;

        for (const persona of this._personasConDepartamentosList) {
            persona.idDepartamentoGuess = 0;
        }
    }
    //#endregion

    //#region MÉTODOS PRIVADOS
    /**
     * Genera colores únicos por departamento
     */
    private generarColoresPorDepartamento(personas: PersonaConListaDepartamentos[]): { [key: number]: string } {
        const colores: { [key: number]: string } = {};
        const coloresDisponibles = [
            "#FFE5E5", "#E5F5FF", "#E5FFE5", "#FFF5E5", "#F5E5FF",
            "#FFE5F5", "#E5FFFF", "#FFFFE5", "#F5FFE5", "#E5E5FF"
        ];
        let indiceColor = 0;

        for (const persona of personas) {
            const idDepartamento = this.obtenerIdDepartamentoReal(persona);
            
            if (!colores[idDepartamento]) {
                colores[idDepartamento] = coloresDisponibles[indiceColor % coloresDisponibles.length];
                indiceColor = indiceColor + 1;
            }
        }

        return colores;
    }

    /**
     * Obtiene el ID del departamento real de una persona
     */
    private obtenerIdDepartamentoReal(persona: PersonaConListaDepartamentos): number {
        return persona.listadoDepartamentos[0]?.id || 0;
    }

    /**
     * Convierte la lista de modelos a DTOs
     */
    private convertirADTO(personas: PersonaConListaDepartamentosYColor[]): PersonaConListaDepartamentos[] {
        const dtos: PersonaConListaDepartamentos[] = [];

        for (const persona of personas) {
            const dto = new PersonaConListaDepartamentos(
                persona.nombrePersona,
                persona.apellidosPersona,
                persona.listadoDepartamentos,
                persona.idDepartamentoGuess
            );
            dtos.push(dto);
        }

        return dtos;
    }
    //#endregion
}