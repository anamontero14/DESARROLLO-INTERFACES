import { Persona } from "../../entities/Persona";

/**
 * Interfaz para el repositorio de personas
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IRepositoryPersonas {
    /**
     * Devuelve la lista completa de personas
     */
    getListadoCompletoPersonas(): Persona[];

    /**
     * Devuelve una persona por su ID
     * @param id Identificador de la persona
     */
    getPersonaPorId(id: number): Persona | undefined;

    /**
     * Agrega una nueva persona al repositorio
     * @param persona Objeto Persona a agregar
     */
    agregarPersona(persona: Persona): void;

    /**
     * Actualiza los datos de una persona existente
     * @param id ID de la persona a actualizar
     * @param persona Objeto Persona con los nuevos datos
     */
    actualizarPersona(id: number, persona: Persona): boolean;

    /**
     * Elimina una persona del repositorio por ID
     * @param id ID de la persona a eliminar
     */
    eliminarPersona(id: number): boolean;
}
