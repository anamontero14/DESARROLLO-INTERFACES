import { Persona } from "@/app/domain/entities/Persona";
import { inject } from "inversify";
import { TYPES } from "../../core/types";
import { IUseCasePersonas } from "../../domain/interfaces/usecase/IUseCasePersonas";
import {  makeAutoObservable } from "mobx";

export class PeopleListVM {
    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private IUseCasePersonas: IUseCasePersonas
    ) {
        this._personaSeleccionada = new Persona(0, 'Fernando', 'Galiana', 0, new Date(), '', '', 0, '');
        this._personasList = this.IUseCasePersonas.getListadoCompletoPersonas();
        makeAutoObservable(this);
    }

    /**
     * Método para obtener una lista de todas las personas
    */
    public get personasList(): Persona[] {
        return this._personasList;
    }

    /**
     * Método para obtener a una persona en específico de la BBDD
     */
    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    /**
     * Método para actualizar una persona en específico
     */
    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        //alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellido}`);
        
    }
  }
