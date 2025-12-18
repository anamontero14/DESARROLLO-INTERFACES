import { inject, injectable } from "inversify";
import { Pokemon } from "../entities/Pokemon";
import { IPokemonUseCase } from "../interfaces/usecases/IPokemonUseCase";
import { TYPES } from "../../core/types";
import { IPokemonRepository } from "../interfaces/repositories/IPokemonRepository";

@injectable()
export class PokemonUseCase implements IPokemonUseCase {

    //se inyecta el repositorio
    constructor(@inject(TYPES.IPokemonRepository) private repositoryPokemon: IPokemonRepository) { }

    getListaPokemon(offset: number): Promise<Pokemon[]> {
        return this.repositoryPokemon.getListaPokemon(offset);
    }

}