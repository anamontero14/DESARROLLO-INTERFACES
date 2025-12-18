import { inject, injectable } from "inversify";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokeAPI } from "../datasource/PokemonAPI";
import { TYPES } from "../../core/types";
import { IPokemonRepository } from "@/src/domain/interfaces/repositories/IPokemonRepository";

@injectable()
export class PokemonRepository implements IPokemonRepository {
    
    constructor(
        @inject(TYPES.PokeAPI) private pokeAPI: PokeAPI
    ) {}

    async getListaPokemon(offset: number): Promise<Pokemon[]> {
        const data = await this.pokeAPI.fetchPokemonList(offset);
        
        return data.results.map((item: any) => new Pokemon(item.name, item.url));
    }
}