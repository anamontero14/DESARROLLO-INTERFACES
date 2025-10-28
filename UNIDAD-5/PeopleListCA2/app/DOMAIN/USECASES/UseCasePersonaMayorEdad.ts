import { inject, injectable } from "inversify";
import { Persona } from "../ENTITIES/Persona";
import { IRepositoryPersonasUseCase } from "../INTERFACES/IRepositoryPersonasUseCase";
import { TYPES } from "@/app/CORE/types";
import { IRepositoryPersonas } from "../REPOSITORIES/IRepositoryPersona";

@injectable()
//implementa IRepositoryPersonaUseCase
class UseCasePersonaMayorEdad implements IRepositoryPersonasUseCase {

    private _listado: Persona[];

    constructor(@inject(TYPES.IRepositoryPersonas) private repositoryPersonas: IRepositoryPersonas) { }

    GetListPersonasFiltradas(): Persona[] {

        this._listado = this.repositoryPersonas.

        const listaPersonasPermitidas: Persona[];

        // Recorremos todas las personas
        for (let persona of this._listado) {
            
        }

        return [];
    }

}