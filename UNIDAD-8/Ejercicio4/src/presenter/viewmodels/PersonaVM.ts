// src/presenter/viewmodels/PersonaVM.ts

import { injectable, inject } from "inversify";
import { makeAutoObservable } from "mobx";
import { IPersonaUseCase } from "../../domain/interfaces/usecases/IPersonaUseCase";
import { Persona } from "../../domain/entities/Persona";
import { TYPES } from "../../core/types";

@injectable()
export class PersonaViewModel {
  private _personasList: Persona[] = [];
  private _personaSeleccionada: Persona | null = null;
  private _isLoading: boolean = false;
  private readonly _casoDeUsoPersona: IPersonaUseCase;

  constructor(@inject(TYPES.IPersonaUseCase) casoDeUsoPersona: IPersonaUseCase) {
    this._casoDeUsoPersona = casoDeUsoPersona;
    makeAutoObservable(this);
  }

  get PersonaList(): Persona[] {
    return this._personasList;
  }

  get PersonaSeleccionada(): Persona | null {
    return this._personaSeleccionada;
  }

  set PersonaSeleccionada(persona: Persona | null) {
    this._personaSeleccionada = persona;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async cargarPersonas(): Promise<void> {
    this._isLoading = true;
    const personas = await this._casoDeUsoPersona.getAllPersonas();
    this._personasList = personas;
    this._isLoading = false;
  }

  async crearPersona(persona: Persona): Promise<void> {
    this._isLoading = true;
    await this._casoDeUsoPersona.insertarPersona(persona);
    await this.cargarPersonas();
    this._isLoading = false;
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<void> {
    this._isLoading = true;
    await this._casoDeUsoPersona.editarPersona(idPersonaEditar, persona);
    await this.cargarPersonas();
    this._isLoading = false;
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<void> {
    this._isLoading = true;
    
    try {
      await this._casoDeUsoPersona.eliminarPersona(idPersonaEliminar);
      const personasFiltradas = this._personasList.filter(p => p.ID !== idPersonaEliminar);
      this._personasList = personasFiltradas;
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      throw error;
    } finally {
      this._isLoading = false;
    }
  }
}