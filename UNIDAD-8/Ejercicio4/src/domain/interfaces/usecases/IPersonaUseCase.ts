// src/domain/interfaces/usecases/IPersonaUseCase.ts

import { Persona } from "../../entities/Persona";

export interface IPersonaUseCase {
  getAllPersonas(): Promise<Persona[]>;
  editarPersona(idPersonaEditar: number, persona: Persona): Promise<number>;
  insertarPersona(personaNueva: Persona): Promise<number>;
  eliminarPersona(idPersonaEliminar: number): Promise<number>;
}