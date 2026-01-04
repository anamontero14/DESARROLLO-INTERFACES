// src/data/repositories/PersonaRepository.ts

import { inject, injectable } from "inversify";
import { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { Persona } from "../../domain/entities/Persona";
import { PersonaBDAPI } from "../datasource/PersonaBDAPI";
import { TYPES } from "../../core/types";

/**
 * Implementación del repositorio de personas
 */
@injectable()
export class PersonaRepository implements IPersonaRepository {
    
    constructor(
        @inject(TYPES.PersonaBDAPI) private personaBDAPI: PersonaBDAPI
    ) {}

    /**
     * Obtiene todas las personas desde la API
     */
    async getAllPersonas(): Promise<Persona[]> {
        const data = await this.personaBDAPI.fetchPersonasList();
        const personas: Persona[] = [];
        
        for (const item of data) {
            const persona = new Persona(
                item.id,
                item.nombre,
                item.apellidos,
                item.telefono,
                item.direccion,
                item.foto,
                new Date(item.fechaNacimiento),
                item.idDepartamento
            );
            personas.push(persona);
        }
        
        return personas;
    }

    /**
     * Obtiene una persona específica por su ID
     */
    async getPersonaById(id: number): Promise<Persona | null> {
        const data = await this.personaBDAPI.fetchPersonaById(id);
        
        if (!data) {
            return null;
        }
        
        const persona = new Persona(
            data.id,
            data.nombre,
            data.apellidos,
            data.telefono,
            data.direccion,
            data.foto,
            new Date(data.fechaNacimiento),
            data.idDepartamento
        );
        
        return persona;
    }
}