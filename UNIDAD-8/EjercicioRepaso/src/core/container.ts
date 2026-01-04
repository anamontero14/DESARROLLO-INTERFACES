// src/core/container.ts

import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { PersonaBDAPI } from "../data/datasource/PersonaBDAPI";
import { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";
import { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { IUseCasePersona } from "../domain/interfaces/usecases/IUseCasePersona";
import { UseCasePersona } from "../domain/usecases/UseCasePersona";
import { IUseCaseJuego } from "../domain/interfaces/usecases/IUseCaseJuego";
import { UseCaseJuego } from "../domain/usecases/UseCaseJuego";
import { EjercicioRepasoVM } from "../presenter/viewmodels/EjercicioRepasoVM";

const container = new Container();

// Vincular datasource
container.bind<PersonaBDAPI>(TYPES.PersonaBDAPI).to(PersonaBDAPI);

// Vincular repositories
container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository);

// Vincular use cases
container.bind<IUseCasePersona>(TYPES.IUseCasePersona).to(UseCasePersona);
container.bind<IUseCaseJuego>(TYPES.IUseCaseJuego).to(UseCaseJuego);

// Vincular viewmodel
container.bind<EjercicioRepasoVM>(TYPES.EjercicioRepasoVM).to(EjercicioRepasoVM);

export { container };