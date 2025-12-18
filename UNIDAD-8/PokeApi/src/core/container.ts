import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { PokeAPI } from "../data/datasource/PokemonAPI";
import { PokemonRepository } from "../data/repositories/PokemonRepository";
import { IPokemonRepository } from "../domain/interfaces/repositories/IPokemonRepository"
import { IPokemonUseCase } from "../domain/interfaces/usecases/IPokemonUseCase";
import { PokemonUseCase } from "../domain/usecases/PokemonUseCase";
import { PokemonVM } from "../presenter/viewmodels/PokemonVM";

const container = new Container();

// Vincular datasource
container.bind<PokeAPI>(TYPES.PokeAPI).to(PokeAPI);  // ← AÑADIR ESTO

// Vincular repository, usecase, viewmodel
container.bind<IPokemonRepository>(TYPES.IPokemonRepository).to(PokemonRepository);
container.bind<IPokemonUseCase>(TYPES.IPokemonUseCase).to(PokemonUseCase);
container.bind<PokemonVM>(TYPES.PokemonVM).to(PokemonVM);

export { container };