import { Persona } from "../ENTITIES/Persona";

/**
 * Interfaz con un solo método que tiene que devolver
 * una lista de personas
 */
export interface IRepositoryPersonas {
    GetListPersonas(): Persona[];
}