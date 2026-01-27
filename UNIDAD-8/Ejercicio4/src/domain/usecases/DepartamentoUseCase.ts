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
    var resultado = -1;
    //recoge la validez de la operacion
    var validez = await this.comprobarEliminarDepartamento(idDepartamentoEliminar)
    //si el departamento NO tiene personas
    if (validez) {
      //el resultado es igualado a lo que devuelva eliminar departamento
      resultado = await this._departamentoRepository.eliminarDepartamento(idDepartamentoEliminar);
    }
    return resultado;
  }

  private async comprobarEliminarDepartamento(idDepartamento: number): Promise<Boolean> {
    //variable que indicará si el departamento se puede borrar o no
    var validez = false;
    //constante que guardará el número de personas que se obtienen
    const numPersonas = await this._departamentoRepository.contarPersonasEnDepartamento(idDepartamento);

    //comprueba que NINGUNA persona esté en ese departamento antes de eliminarla
    if (numPersonas == 0) {
      validez = true
    }
    //devuelve la validez de la operación
    return validez;
  }
}