// src/data/datasource/PersonaBDAPI.ts

import { injectable } from "inversify";

/**
 * DataSource para conectar con la API de Azure
 */
@injectable()
export class PersonaBDAPI {
    private readonly API_URL: string;

    constructor() {
        this.API_URL = "https://montero-hzedh8ahesg5cceh.francecentral-01.azurewebsites.net";
    }

    /**
     * Obtiene la lista de personas desde la API
     */
    async fetchPersonasList(): Promise<any> {
        const response = await fetch(`${this.API_URL}/API/Persona`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener personas: ${response.status}`);
        }
        
        return response.json();
    }

    /**
     * Obtiene la lista de departamentos desde la API
     */
    async fetchDepartamentosList(): Promise<any> {
        const response = await fetch(`${this.API_URL}/API/Departamento`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener departamentos: ${response.status}`);
        }
        
        return response.json();
    }

    /**
     * Obtiene una persona específica por ID
     */
    async fetchPersonaById(id: number): Promise<any> {
        const response = await fetch(`${this.API_URL}/API/Persona/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener persona ${id}: ${response.status}`);
        }
        
        return response.json();
    }

    /**
     * Obtiene un departamento específico por ID
     */
    async fetchDepartamentoById(id: number): Promise<any> {
        const response = await fetch(`${this.API_URL}/API/Departamento/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener departamento ${id}: ${response.status}`);
        }
        
        return response.json();
    }
}