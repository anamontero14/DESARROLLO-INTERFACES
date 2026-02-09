import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

//capa de data
import { JuegoDataSource } from "../data/datasource/JuegoDataSource";
import { IRepositoryJuego } from "../domain/interfaces/repositories/IRepositoryJuego";
import { RepositoryJuego } from "../data/repositories/RepositoryJuego";

//capa de domain
import { UseCaseJuego } from "../domain/usecases/UseCaseJuego";

//viewmodel
import { VMJuego } from "../presenter/viewmodels/VMJuego";

//instancia del contenedor
const container = new Container();

//url del hub
container.bind<string>(TYPES.HubUrl).toConstantValue(
    "https://servidor3enraya-ecepgbe2a0amgqgf.francecentral-01.azurewebsites.net/juegoHub"
);

//datasource se pone como singleton
container
    .bind<JuegoDataSource>(TYPES.JuegoDataSource)
    .to(JuegoDataSource)
    .inSingletonScope();

//repository como singleton
container
    .bind<IRepositoryJuego>(TYPES.IRepositoryJuego)
    .to(RepositoryJuego)
    .inSingletonScope();

//caso de uso
container.bind<UseCaseJuego>(TYPES.UseCaseJuego).to(UseCaseJuego);

//biewmodel
container.bind<VMJuego>(TYPES.VMJuego).to(VMJuego);

export { container };