import { Persona } from "../ENTITIES/Persona";

export interface IRepositoryPersonasUseCase {
    GetListPersonas(): Persona[];
}