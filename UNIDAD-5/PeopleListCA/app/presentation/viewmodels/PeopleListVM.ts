import { inject, injectable } from "inversify";
// Importamos la Entidad desde Domain
import { Persona } from "../../domain/entities/Persona";
// Importamos el Caso de Uso desde Domain
import { GetPeopleListUseCase } from "../../domain/usecases/GetPeopleListUseCase";
import { TYPES } from "../../core/types";


@injectable()
export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;

    // Ahora inyectamos el Caso de Uso, no el Repositorio.
    constructor(@inject(TYPES.GetPeopleListUseCase) private getPeopleListUseCase: GetPeopleListUseCase) {
        this._personaSeleccionada = new Persona(0, '', '');
        
        // El ViewModel llama al Caso de Uso para obtener los datos.
        this._personasList = this.getPeopleListUseCase.execute(); 
    }

    public get personasList(): Persona[] {
        return this._personasList;
    }

    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
    }

}