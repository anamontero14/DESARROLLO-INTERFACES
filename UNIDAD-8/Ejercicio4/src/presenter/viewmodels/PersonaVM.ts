// src/presenter/viewmodels/PersonaVM.ts

import { injectable, inject } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
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

  // ✅ Envolver el setter en runInAction
  set PersonaSeleccionada(persona: Persona | null) {
    runInAction(() => {
      this._personaSeleccionada = persona;
    });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async cargarPersonas(): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    });
    
    try {
      const personas = await this._casoDeUsoPersona.getAllPersonas();
      
      runInAction(() => {
        this._personasList = personas;
      });
    } catch (error) {
      console.error("Error al cargar personas:", error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async crearPersona(persona: Persona): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    });
    
    try {
      await this._casoDeUsoPersona.insertarPersona(persona);
      await this.cargarPersonas();
    } catch (error) {
      console.error("Error al crear persona:", error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    });
    
    try {
      await this._casoDeUsoPersona.editarPersona(idPersonaEditar, persona);
      await this.cargarPersonas();
    } catch (error) {
      console.error("Error al editar persona:", error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<void> {
    runInAction(() => { 
      this._isLoading = true; 
    });
    
    try {
      await this._casoDeUsoPersona.eliminarPersona(idPersonaEliminar);
      await this.cargarPersonas();
    } catch (error) {
      console.error("VM: eliminarPersona error", error);
      throw error;
    } finally {
      runInAction(() => { 
        this._isLoading = false; 
      });
    }
  }
}