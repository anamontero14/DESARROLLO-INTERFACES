// src/domain/usecases/UseCasePersona.ts

import { inject, injectable } from "inversify";
import { IUseCasePersona } from "../interfaces/usecases/IUseCasePersona";
import { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { PersonaConListaDepartamentos } from "../dtos/PersonaConListaDepartamentos";
import { Persona } from "../entities/Persona";
import { TYPES } from "../../core/types";

/**
 * Caso de uso para operaciones relacionadas con personas
 */
@injectable()
export class UseCasePersona implements IUseCasePersona {
    private personaRepository: IPersonaRepository;
    private departamentoRepository: IDepartamentoRepository;

    constructor(
        @inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository,
        @inject(TYPES.IDepartamentoRepository) departamentoRepository: IDepartamentoRepository
    ) {
        this.personaRepository = personaRepository;
        this.departamentoRepository = departamentoRepository;
    }

    /**
     * Obtiene la lista de personas con todos los departamentos disponibles
     */
    async getPersonas(): Promise<PersonaConListaDepartamentos[]> {
        const personas = await this.personaRepository.getAllPersonas();
        const departamentos = await this.departamentoRepository.getAllDepartamentos();
        const listaPersonasConDepartamentos: PersonaConListaDepartamentos[] = [];
        
        for (const persona of personas) {
            const personaConDepartamentos = new PersonaConListaDepartamentos(
                persona.nombre,
                persona.apellidos,
                departamentos,
                persona.idDepartamento, // ← CAMBIADO: Pasar el ID real del departamento
                0
            );
            listaPersonasConDepartamentos.push(personaConDepartamentos);
        }
        
        return listaPersonasConDepartamentos;
    }

    /**
     * Obtiene una persona específica por su ID
     */
    async getPersonaById(idPersonaSeleccionada: number): Promise<Persona | null> {
        const persona = await this.personaRepository.getPersonaById(idPersonaSeleccionada);
        return persona;
    }
}