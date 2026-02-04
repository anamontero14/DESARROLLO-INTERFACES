// Tokens únicos para identificar cada dependencia en el contenedor
export const TYPES = {
    // URL del hub de SignalR
    HubUrl: Symbol.for("HubUrl"),

    // DataSource de juego
    JuegoDataSource: Symbol.for("JuegoDataSource"),

    // Repositorio de juego
    IRepositoryJuego: Symbol.for("IRepositoryJuego"),

    // Caso de uso de juego
    UseCaseJuego: Symbol.for("UseCaseJuego"),

    // ViewModel de juego
    VMJuego: Symbol.for("VMJuego"),
};