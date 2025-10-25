import { Container } from "inversify";
import "reflect-metadata";

// Importaciones adaptadas a Clean Architecture
import { IRepositoryPersonas } from "../domain/interfaces/IRepositoryPersonas"; // Interfaz desde Domain
import { PersonasRepository100 } from "../data/repositories/RepositoryPersona"; // Implementación desde Data
import { GetPeopleListUseCase } from "../domain/usecases/GetPeopleListUseCase"; // Caso de Uso desde Domain
import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM"; // ViewModel desde Presentation
import { TYPES } from "./types";

const container = new Container();

// 1. Vinculamos la Interfaz del Repositorio con su Implementación Concreta (Data/Infraestructura)
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository100);

// 2. Vinculamos el Caso de Uso. Como depende de IRepositoryPersonas, Inversify lo resolverá.
container.bind<GetPeopleListUseCase>(TYPES.GetPeopleListUseCase).to(GetPeopleListUseCase);

// 3. Vinculamos el ViewModel. Ahora depende del Caso de Uso.
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);

export { container };