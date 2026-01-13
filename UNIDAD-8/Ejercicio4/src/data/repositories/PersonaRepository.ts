// src/data/repositories/PersonaRepository.ts

import { injectable, inject } from "inversify";
import { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { Persona } from "../../domain/entities/Persona";
import { PersonaBDAPI } from "../datasource/PersonaBDAPI";
import { TYPES } from "../../core/types";

@injectable()
export class PersonaRepository implements IPersonaRepository {
  private readonly _dataSource: PersonaBDAPI;

  constructor(@inject(TYPES.PersonaBDAPI) dataSource: PersonaBDAPI) {
    this._dataSource = dataSource;
  }

  async getAllPersonas(): Promise<Persona[]> {
    const resultado = await this._dataSource.fetchPersonaList();
    return resultado;
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<number> {
    const resultado = await this._dataSource.updatePersona(idPersonaEditar, persona);
    return resultado;
  }

  async insertarPersona(personaNueva: Persona): Promise<number> {
    const resultado = await this._dataSource.insertPersona(personaNueva);
    return resultado;
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<number> {
    const resultado = await this._dataSource.deletePersona(idPersonaEliminar);
    return resultado;
  }
}
