// src/data/repositories/DepartamentoRepository.ts

import { inject, injectable } from "inversify";
import { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { Departamento } from "../../domain/entities/Departamento";
import { PersonaBDAPI } from "../datasource/PersonaBDAPI";
import { TYPES } from "../../core/types";

/**
 * Implementación del repositorio de departamentos
 */
@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
    
    constructor(
        @inject(TYPES.PersonaBDAPI) private personaBDAPI: PersonaBDAPI
    ) {}

    /**
     * Obtiene todos los departamentos desde la API
     */
    async getAllDepartamentos(): Promise<Departamento[]> {
        const data = await this.personaBDAPI.fetchDepartamentosList();
        const departamentos: Departamento[] = [];
        
        for (const item of data) {
            const departamento = new Departamento(item.id, item.nombre);
            departamentos.push(departamento);
        }
        
        return departamentos;
    }

    /**
     * Obtiene un departamento específico por su ID
     */
    async getDepartamentoById(id: number): Promise<Departamento | null> {
        const data = await this.personaBDAPI.fetchDepartamentoById(id);
        
        if (!data) {
            return null;
        }
        
        const departamento = new Departamento(data.id, data.nombre);
        
        return departamento;
    }
}