import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

// Importar Data Layer
import { JuegoDataSource } from "../data/datasource/JuegoDataSource";
import { IRepositoryJuego } from "../domain/interfaces/repositories/IRepositoryJuego";
import { RepositoryJuego } from "../data/repositories/RepositoryJuego";

// Importar Domain Layer
import { UseCaseJuego } from "../domain/usecases/UseCaseJuego";

// Importar Presenter Layer
import { VMJuego } from "../presenter/viewmodels/VMJuego";

// Crear instancia del contenedor
const container = new Container();

// Configurar la URL del hub
container.bind<string>(TYPES.HubUrl).toConstantValue(
    "https://localhost:7085/juegoHub"
);

// Registrar DataSource como singleton
container
    .bind<JuegoDataSource>(TYPES.JuegoDataSource)
    .to(JuegoDataSource)
    .inSingletonScope();

// Registrar Repository como singleton
container
    .bind<IRepositoryJuego>(TYPES.IRepositoryJuego)
    .to(RepositoryJuego)
    .inSingletonScope();

// Registrar UseCase
container.bind<UseCaseJuego>(TYPES.UseCaseJuego).to(UseCaseJuego);

// Registrar ViewModel
container.bind<VMJuego>(TYPES.VMJuego).to(VMJuego);

export { container };