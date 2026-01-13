// src/domain/interfaces/repositories/IPersonaRepository.ts

import { Persona } from "../../entities/Persona";

export interface IPersonaRepository {
  getAllPersonas(): Promise<Persona[]>;
  editarPersona(idPersonaEditar: number, persona: Persona): Promise<number>;
  insertarPersona(personaNueva: Persona): Promise<number>;
  eliminarPersona(idPersonaEliminar: number): Promise<number>;
}