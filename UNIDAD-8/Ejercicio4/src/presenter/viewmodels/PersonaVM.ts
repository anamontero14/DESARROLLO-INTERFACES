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

  //devuelve una lista de personas
  get PersonaList(): Persona[] {
    return this._personasList;
  }

  //devuelve la persona seleccionada
  get PersonaSeleccionada(): Persona | null {
    return this._personaSeleccionada;
  }

  //actualiza la persona seleccionada EN LA VARIABLE DEL VIEW MODEL
  set PersonaSeleccionada(persona: Persona | null) {
    this._personaSeleccionada = persona;
  }

  //variable para controlar que los datos se están cargando
  get isLoading(): boolean {
    return this._isLoading;
  }

  //función que carga personas de la BBDD
  async cargarPersonas(): Promise<void> {
    runInAction(() => {
      //la variable que controla que se estén cargando los datos pasa a ser true
      //(porque está cargando datos)
      this._isLoading = true; 
    })
    //se almacenan la lista de todas las personas obtenidas en la variable
    const personas = await this._casoDeUsoPersona.getAllPersonas();
    
    runInAction(() => {
      //se actualiza la variable de la lista de personas y la de carga de datos
      this._personasList = personas;
      //la carga de datos ha terminado
      this._isLoading = false;
    })
  }

  //función que sirve para crear personas
  async crearPersona(persona: Persona): Promise<void> {
    runInAction(() => {
      //el circulo de cargar se pone a true porque se tiene que mostrar
      //ya que se están cargando datos de la BBDD
      this._isLoading = true;
    })
    //se llama a la función de crear personas con el caso de uso
    //mandándole la persona nueva
    await this._casoDeUsoPersona.insertarPersona(persona);
    //y se vuelven a cargar las personas
    await this.cargarPersonas();
    runInAction(() => {
      //y el circulito de cargar se va porque ya se ha creado la persona
      this._isLoading = false; 
    })
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<void> {
    runInAction(() => {
      //el circulo de cargar se pone a true porque se tiene que mostrar
      //ya que se están cargando datos de la BBDD
      this._isLoading = true;
    })
    await this._casoDeUsoPersona.editarPersona(idPersonaEditar, persona);
    await this.cargarPersonas();
    runInAction(() => {
      //y el circulito de cargar se va porque ya se ha creado la persona
      this._isLoading = false; 
    })
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<void> {
    console.log("VM: eliminarPersona start", idPersonaEliminar);
    runInAction(() => { this._isLoading = true; });
    try {
      await this._casoDeUsoPersona.eliminarPersona(idPersonaEliminar);
      console.log("VM: eliminarPersona success");
      await this.cargarPersonas();
    } catch (error) {
      console.error("VM: eliminarPersona error", error);
      throw error;
    } finally {
      runInAction(() => { this._isLoading = false; });
    }
  }
}