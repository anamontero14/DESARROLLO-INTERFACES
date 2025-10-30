import { Persona } from "../ENTITIES/Persona";

export interface IRepositoryPersonasUseCase {
    GetListPersonasFiltradas(): Persona[];
}