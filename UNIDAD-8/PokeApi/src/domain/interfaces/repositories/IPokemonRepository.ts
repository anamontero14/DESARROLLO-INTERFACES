import { Pokemon } from "../../entities/Pokemon";

/**
 * Interfaz para el repositorio de pokemon
 * Define los métodos que cualquier implementación debe ofrecer
 */
export interface IPokemonRepository {
    /**
     * Devuelve la lista completa de pokemon
     */
   getListaPokemon(offset: number): Promise<Pokemon[]>;

}
