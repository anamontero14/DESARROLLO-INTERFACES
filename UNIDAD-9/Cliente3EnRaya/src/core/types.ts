// Tokens únicos para identificar cada dependencia en el contenedor
export const TYPES = {
    //url del hub
    HubUrl: Symbol.for("HubUrl"),

    //datasoruce (api)
    JuegoDataSource: Symbol.for("JuegoDataSource"),

    //repositorio
    IRepositoryJuego: Symbol.for("IRepositoryJuego"),

    //caso de uso
    UseCaseJuego: Symbol.for("UseCaseJuego"),

    //viewmodel
    VMJuego: Symbol.for("VMJuego"),
};