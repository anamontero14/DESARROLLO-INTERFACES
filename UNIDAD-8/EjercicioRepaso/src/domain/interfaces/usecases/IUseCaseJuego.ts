// src/domain/interfaces/usecases/IUseCaseJuego.ts

import { PersonaConListaDepartamentos } from "../../dtos/PersonaConListaDepartamentos";

/**
 * Interfaz para el caso de uso del juego
 */
export interface IUseCaseJuego {
    /**
     * Comprueba los aciertos en el juego
     * @param listaConPersonasYDepartamentos Lista con las selecciones del usuario
     * @returns Número de aciertos
     */
    comprobarAciertos(listaConPersonasYDepartamentos: PersonaConListaDepartamentos[]): Promise<number>;
}