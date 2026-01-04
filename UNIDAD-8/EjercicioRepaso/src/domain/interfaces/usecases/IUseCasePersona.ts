// src/domain/interfaces/usecases/IUseCasePersona.ts

import { PersonaConListaDepartamentos } from "../../dtos/PersonaConListaDepartamentos";
import { Persona } from "../../entities/Persona";

/**
 * Interfaz para el caso de uso de personas
 */
export interface IUseCasePersona {
    /**
     * Obtiene la lista de personas con sus departamentos disponibles
     */
    getPersonas(): Promise<PersonaConListaDepartamentos[]>;

    /**
     * Obtiene una persona específica por su ID
     */
    getPersonaById(idPersonaSeleccionada: number): Promise<Persona | null>;
}