import { injectable } from "inversify";

@injectable()
export class PokeAPI {
    private readonly API_URL = "https://pokeapi.co/api/v2/pokemon";
    
    async fetchPokemonList(offset: number): Promise<any> {
        const res = await fetch(`${this.API_URL}?offset=${offset}&limit=20`);
        return res.json();
    }
}