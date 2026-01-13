// src/data/repositories/DepartamentoRepository.ts

import { injectable, inject } from "inversify";
import { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { Departamento } from "../../domain/entities/Departamento";
import { PersonaBDAPI } from "../datasource/PersonaBDAPI";
import { TYPES } from "../../core/types";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  private readonly _dataSource: PersonaBDAPI;

  constructor(@inject(TYPES.PersonaBDAPI) dataSource: PersonaBDAPI) {
    this._dataSource = dataSource;
  }

  async getAllDepartamentos(): Promise<Departamento[]> {
    const resultado = await this._dataSource.fetchDepartamentoList();
    return resultado;
  }

  async editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<number> {
    const resultado = await this._dataSource.updateDepartamento(idDepartamentoEditar, departamento);
    return resultado;
  }

  async insertarDepartamento(departamentoNuevo: Departamento): Promise<number> {
    const resultado = await this._dataSource.insertDepartamento(departamentoNuevo);
    return resultado;
  }

  async eliminarDepartamento(idDepartamentoEliminar: number): Promise<number> {
    const resultado = await this._dataSource.deleteDepartamento(idDepartamentoEliminar);
    return resultado;
  }
}