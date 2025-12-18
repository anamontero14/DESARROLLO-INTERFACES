import { Pokemon } from "../../entities/Pokemon";

/**
 * Interfaz para el repositorio de personas
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IPokemonUseCase {
    /**
     * Devuelve la lista completa de personas
     */
    getListaPokemon(offset: number): Promise<Pokemon[]>;
}
