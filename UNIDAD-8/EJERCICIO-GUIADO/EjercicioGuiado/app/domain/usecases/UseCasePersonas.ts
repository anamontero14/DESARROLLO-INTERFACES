import { inject, injectable } from "inversify";
import { Persona } from "../entities/Persona";
import { IUseCasePersonas } from "../interfaces/usecase/IUseCasePersonas";
import { TYPES } from "@/app/core/types";
import { IRepositoryPersonas } from "../interfaces/repositories/IRepositoryPersonas";

@injectable()
//implementa IRepositoryPersonaUseCase
export class UseCasePersonas implements IUseCasePersonas {

    constructor(@inject(TYPES.IRepositoryPersonas) private repositoryPersonas: IRepositoryPersonas) { }

    getListadoCompletoPersonas(): Persona[] {
        return this.repositoryPersonas.getListadoCompletoPersonas()
    }

}