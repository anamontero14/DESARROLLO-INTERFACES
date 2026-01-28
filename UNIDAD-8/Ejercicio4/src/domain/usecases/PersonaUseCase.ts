// src/domain/usecases/PersonaUseCase.ts

import { injectable, inject } from "inversify";
import { IPersonaUseCase } from "../interfaces/usecases/IPersonaUseCase";
import { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import { Persona } from "../entities/Persona";
import { TYPES } from "../../core/types";
import { PersonaDTO } from "../dtos/PersonaDTO";

@injectable()
export class PersonaUseCase implements IPersonaUseCase {
  private readonly _personaRepository: IPersonaRepository;

  constructor(
    @inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository
  ) {
    this._personaRepository = personaRepository;
  }

  //función asíncrona que obtiene todas las personas aplicando la lógica de negocio
  async getAllPersonas(): Promise<PersonaDTO[]> { 
    //almaceno la lista de las personas en la constante
    const personas = await this._personaRepository.getAllPersonas();
    //creo otra constante para almacenar una lista de todas las personas
    //mappeadas al dto
    const personasDTO = personas.map(p => (
      { ID: p.ID, 
        Nombre: p.Nombre, 
        Apellidos: p.Apellidos, 
        Telefono: p.Telefono, 
        Direccion: p.Direccion, 
        Foto: p.Foto, 
        FechaNacimiento: p.FechaNacimiento, 
        IDDepartamento: p.IDDepartamento, 
        Edad: p.FechaNacimiento ? this.calcularEdad(p.FechaNacimiento) : 0 }));
    //ahora hago otra constante con otra lista que almacena las personas ya filtradas
    const resultado = this.esFinDeSemana() ? personasDTO.filter(d => (d.Edad ?? 0) >= 18) : personasDTO; 

    return resultado;
  }

  /**
   función asíncrona que devuelve un booleano 
   Se crea también una constante que almacene el día actual.
   @returns Devuelve un booleano para comprobar si es fin de semana o no.
   Comprobando si el día de la semana es 5 o 6, si es o 5 o 6 significa que
   sí es fin de semana entonces devuelve true
   */
  private esFinDeSemana(): boolean {
    const diaSemana = new Date().getDay();
    return diaSemana === 5 || diaSemana === 6;
  }

  //calcula la edad a partir de una fecha de nacimiento, devolviendo un entero
  public calcularEdad(fechaNacimiento: Date): number {
    //constante que almacena la fecha de hoy
    const hoy = new Date();
    //constante que almacena la fecha que entra por parámetros
    const nacimiento = new Date(fechaNacimiento);
    //se hace el cálculo de la edad
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    return edad;
  }

  // Edita una persona existente
  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<number> {
    return await this._personaRepository.editarPersona(idPersonaEditar, persona);
  }

  // Inserta una nueva persona
  async insertarPersona(personaNueva: Persona): Promise<number> {
    return await this._personaRepository.insertarPersona(personaNueva);
  }

  // Elimina una persona (regla de negocio: no permitido los domingos)
  async eliminarPersona(idPersonaEliminar: number): Promise<number> {
    if (this.esDomingo()) {
      return -1; // Código de error: prohibido por regla de negocio
    }

    try {
      return await this._personaRepository.eliminarPersona(idPersonaEliminar);
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      return 0; // Código de error técnico
    }
  }

  // Verifica si hoy es domingo
  private esDomingo(): boolean {
    return new Date().getDay() === 0;
  }
}