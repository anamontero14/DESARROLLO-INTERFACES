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
        if (!persona.FechaNacimiento) {
          //si no tiene fecha, no puede ser mayor de edad
          return false;
        }
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
    // Validación de negocio: no eliminar los domingos (cliente)
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const esDomingo = diaSemana === 0;
    if (esDomingo) {
      // devolver un código o lanzar un error tipado para que la UI lo muestre claramente
      //  -1 = prohibido por regla de negocio
      return -1;
    }

    try {
      // aquí debes llamar a la capa que hace la petición HTTP (repositorio / datasource)
      // supongamos que tienes this._personaRepo.deletePersona que devuelve 1 en éxito, 0 en fallo
      const resultado = await this._personaRepository.eliminarPersona(idPersonaEliminar);
      return resultado;
    } catch (error) {
      // log y rethrow o devolver 0 según convenga
      console.error("Error técnico al eliminar persona en use case:", error);
      return 0;
    }
  }
}