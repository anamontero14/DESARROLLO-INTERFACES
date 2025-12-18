import { Pokemon } from "../../domain/entities/Pokemon";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { IPokemonUseCase } from "../../domain/interfaces/usecases/IPokemonUseCase";
import { makeAutoObservable } from "mobx";

@injectable()
export class PokemonVM {
    private _pokemonList: Pokemon[] = [];
    private _offset: number = 0;
    private _isLoading: boolean = false;
   
    constructor(
        @inject(TYPES.IPokemonUseCase)
        private _casoDeUsoPokemon: IPokemonUseCase
    ) {
        makeAutoObservable(this);
    }

    // Método que se llama al pulsar el botón
    async cargarSiguiente(): Promise<void> {
        this._isLoading = true;
        try {
            this._pokemonList = await this._casoDeUsoPokemon.getListaPokemon(this._offset);
            this._offset += 20;
        } catch (error) {
            console.error(error);
        } finally {
            this._isLoading = false;
        }
    }

    get pokemonList(): Pokemon[] {
        return this._pokemonList;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}