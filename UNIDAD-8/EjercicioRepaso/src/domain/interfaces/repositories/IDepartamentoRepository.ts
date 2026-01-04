// src/domain/interfaces/repositories/IDepartamentoRepository.ts

import { Departamento } from "../../entities/Departamento";

/**
 * Interfaz para el repositorio de departamentos
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IDepartamentoRepository {
    /**
     * Devuelve la lista completa de departamentos
     */
    getAllDepartamentos(): Promise<Departamento[]>;

    /**
     * Devuelve un departamento en específico por su ID
     */
    getDepartamentoById(id: number): Promise<Departamento | null>;
}