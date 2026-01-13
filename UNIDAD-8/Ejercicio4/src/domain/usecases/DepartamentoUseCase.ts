// src/domain/usecases/DepartamentoUseCase.ts

import { injectable, inject } from "inversify";
import { IDepartamentoUseCase } from "../interfaces/usecases/IDepartamentoUseCase";
import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { Departamento } from "../entities/Departamento";
import { TYPES } from "../../core/types";

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
  private readonly _departamentoRepository: IDepartamentoRepository;

  constructor(
    @inject(TYPES.IDepartamentoRepository) departamentoRepository: IDepartamentoRepository
  ) {
    this._departamentoRepository = departamentoRepository;
  }

  async getAllDepartamentos(): Promise<Departamento[]> {
    const resultado = await this._departamentoRepository.getAllDepartamentos();
    return resultado;
  }

  async editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<number> {
    const resultado = await this._departamentoRepository.editarDepartamento(idDepartamentoEditar, departamento);
    return resultado;
  }

  async insertarDepartamento(departamentoNuevo: Departamento): Promise<number> {
    const resultado = await this._departamentoRepository.insertarDepartamento(departamentoNuevo);
    return resultado;
  }

  async eliminarDepartamento(idDepartamentoEliminar: number): Promise<number> {
    const resultado = await this._departamentoRepository.eliminarDepartamento(idDepartamentoEliminar);
    return resultado;
  }
}