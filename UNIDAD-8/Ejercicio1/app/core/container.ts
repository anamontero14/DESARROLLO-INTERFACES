import { Container } from "inversify";
import "reflect-metadata";
import { IRepositoryPersonas, PersonasRepository } from "../data/repositories/PersonaRepository";
import { TYPES } from "./types";
import { IUseCasePersonas } from "../domain/interfaces/usecase/IUseCasePersonas";
import { UseCasePersonas } from "../domain/usecases/UseCasePersona";
import { PeopleListVM } from "../ui/viewmodels/PeopleListVM";

const container = new Container();

// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository);
container.bind<IUseCasePersonas>(TYPES.IUseCasePersonas).to(UseCasePersonas);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };