// src/domain/interfaces/usecases/IDepartamentoUseCase.ts

import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoUseCase {
  getAllDepartamentos(): Promise<Departamento[]>;
  editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<number>;
  insertarDepartamento(departamentoNuevo: Departamento): Promise<number>;
  eliminarDepartamento(idDepartamentoEliminar: number): Promise<number>;
}