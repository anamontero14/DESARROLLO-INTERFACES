// src/domain/interfaces/repositories/IPersonaRepository.ts

import { Persona } from "../../entities/Persona";

/**
 * Interfaz para el repositorio de personas
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IPersonaRepository {
    /**
     * Devuelve la lista completa de personas
     */
    getAllPersonas(): Promise<Persona[]>;

    /**
     * Devuelve una persona en específico por su ID
     */
    getPersonaById(id: number): Promise<Persona | null>;
}