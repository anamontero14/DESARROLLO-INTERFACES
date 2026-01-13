// src/core/container.ts

import { Container } from "inversify";
import { TYPES } from "./types";

// DataSource
import { PersonaBDAPI } from "../data/datasource/PersonaBDAPI";

// Repositories
import { PersonaRepository } from "../data/repositories/PersonaRepository";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";

// UseCases
import { PersonaUseCase } from "../domain/usecases/PersonaUseCase";
import { DepartamentoUseCase } from "../domain/usecases/DepartamentoUseCase";
import { IPersonaUseCase } from "../domain/interfaces/usecases/IPersonaUseCase";
import { IDepartamentoUseCase } from "../domain/interfaces/usecases/IDepartamentoUseCase";

// ViewModels
import { PersonaViewModel } from "../presenter/viewmodels/PersonaVM";
import { DepartamentoViewModel } from "../presenter/viewmodels/DepartamentoVM";

const container = new Container();

// Bind DataSources
container.bind<PersonaBDAPI>(TYPES.PersonaBDAPI).to(PersonaBDAPI).inSingletonScope();

// Bind Repositories
container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository);

// Bind UseCases
container.bind<IPersonaUseCase>(TYPES.IPersonaUseCase).to(PersonaUseCase);
container.bind<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase).to(DepartamentoUseCase);

// Bind ViewModels
container.bind<PersonaViewModel>(TYPES.PersonaViewModel).to(PersonaViewModel).inSingletonScope();
container.bind<DepartamentoViewModel>(TYPES.DepartamentoViewModel).to(DepartamentoViewModel).inSingletonScope();

export { container };