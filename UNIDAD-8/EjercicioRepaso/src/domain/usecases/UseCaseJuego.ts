// src/domain/usecases/UseCaseJuego.ts

import { inject, injectable } from "inversify";
import { IUseCaseJuego } from "../interfaces/usecases/IUseCaseJuego";
import { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import { PersonaConListaDepartamentos } from "../dtos/PersonaConListaDepartamentos";
import { TYPES } from "../../core/types";

/**
 * Caso de uso para la lógica del juego
 */
@injectable()
export class UseCaseJuego implements IUseCaseJuego {
    private personaRepository: IPersonaRepository;

    constructor(
        @inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository
    ) {
        this.personaRepository = personaRepository;
    }

    /**
     * Comprueba cuántos aciertos ha tenido el usuario
     */
    async comprobarAciertos(listaConPersonasYDepartamentos: PersonaConListaDepartamentos[]): Promise<number> {
        const personasReales = await this.personaRepository.getAllPersonas();
        let aciertos = 0;
        let indice = 0;
        
        for (const personaConDepartamento of listaConPersonasYDepartamentos) {
            const personaReal = personasReales[indice];
            
            if (personaReal && personaConDepartamento.idDepartamentoGuess === personaReal.idDepartamento) {
                aciertos = aciertos + 1;
            }
            
            indice = indice + 1;
        }
        
        return aciertos;
    }
}