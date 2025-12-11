import { Persona } from "../../entities/Persona";

/**
 * Interfaz para el repositorio de personas
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IUseCasePersonas {
    /**
     * Devuelve la lista completa de personas
     */
    getListadoCompletoPersonas(): Persona[];
}
