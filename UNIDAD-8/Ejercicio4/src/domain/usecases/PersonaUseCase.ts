// src/domain/usecases/PersonaUseCase.ts

import { injectable, inject } from "inversify";
import { IPersonaUseCase } from "../interfaces/usecases/IPersonaUseCase";
import { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import { Persona } from "../entities/Persona";
import { TYPES } from "../../core/types";

@injectable()
export class PersonaUseCase implements IPersonaUseCase {
  private readonly _personaRepository: IPersonaRepository;

  constructor(
    @inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository
  ) {
    this._personaRepository = personaRepository;
  }

  async getAllPersonas(): Promise<Persona[]> {
    const todasLasPersonas = await this._personaRepository.getAllPersonas();
    const personasFiltradas = this.aplicarLogicaNegocio(todasLasPersonas);
    return personasFiltradas;
  }

  private aplicarLogicaNegocio(personas: Persona[]): Persona[] {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const esViernesOSabado = diaSemana === 5 || diaSemana === 6;
    let resultado: Persona[] = [];

    if (esViernesOSabado) {
      resultado = personas.filter((persona) => {
        const edad = this.calcularEdad(persona.FechaNacimiento);
        return edad >= 18;
      });
    } else {
      resultado = personas;
    }

    return resultado;
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const condicionMes = mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate());

    if (condicionMes) {
      edad = edad - 1;
    }

    return edad;
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<number> {
    const resultado = await this._personaRepository.editarPersona(idPersonaEditar, persona);
    return resultado;
  }

  async insertarPersona(personaNueva: Persona): Promise<number> {
    const resultado = await this._personaRepository.insertarPersona(personaNueva);
    return resultado;
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<number> {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const esDomingo = diaSemana === 0;
    let resultado = 0;

    if (esDomingo) {
      throw new Error("No se pueden eliminar personas los domingos");
    } else {
      resultado = 1;
    }

    return resultado;
  }
}