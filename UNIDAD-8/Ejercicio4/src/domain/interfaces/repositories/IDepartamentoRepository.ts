// src/domain/interfaces/repositories/IDepartamentoRepository.ts

import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoRepository {
  getAllDepartamentos(): Promise<Departamento[]>;
  editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<number>;
  insertarDepartamento(departamentoNuevo: Departamento): Promise<number>;
  eliminarDepartamento(idDepartamentoEliminar: number): Promise<number>;
  contarPersonasEnDepartamento(idDepartamentoContar: number): Promise<number>;
}