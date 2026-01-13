// src/presenter/viewmodels/DepartamentoVM.ts

import { injectable, inject } from "inversify";
import { makeAutoObservable } from "mobx";
import { IDepartamentoUseCase } from "../../domain/interfaces/usecases/IDepartamentoUseCase";
import { Departamento } from "../../domain/entities/Departamento";
import { TYPES } from "../../core/types";

@injectable()
export class DepartamentoViewModel {
  private _departamentosList: Departamento[] = [];
  private _departamentoSeleccionado: Departamento | null = null;
  private _isLoading: boolean = false;
  private readonly _casoDeUsoDepartamento: IDepartamentoUseCase;

  constructor(@inject(TYPES.IDepartamentoUseCase) casoDeUsoDepartamento: IDepartamentoUseCase) {
    this._casoDeUsoDepartamento = casoDeUsoDepartamento;
    makeAutoObservable(this);
  }

  get DepartamentoList(): Departamento[] {
    return this._departamentosList;
  }

  get DepartamentoSeleccionado(): Departamento | null {
    return this._departamentoSeleccionado;
  }

  set DepartamentoSeleccionado(departamento: Departamento | null) {
    this._departamentoSeleccionado = departamento;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async cargarDepartamentos(): Promise<void> {
    this._isLoading = true;
    const departamentos = await this._casoDeUsoDepartamento.getAllDepartamentos();
    this._departamentosList = departamentos;
    this._isLoading = false;
  }

  async crearDepartamento(departamento: Departamento): Promise<void> {
    this._isLoading = true;
    await this._casoDeUsoDepartamento.insertarDepartamento(departamento);
    await this.cargarDepartamentos();
    this._isLoading = false;
  }

  async editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<void> {
    this._isLoading = true;
    await this._casoDeUsoDepartamento.editarDepartamento(idDepartamentoEditar, departamento);
    await this.cargarDepartamentos();
    this._isLoading = false;
  }

  async eliminarDepartamento(idDepartamentoEliminar: number): Promise<void> {
    this._isLoading = true;
    
    try {
      await this._casoDeUsoDepartamento.eliminarDepartamento(idDepartamentoEliminar);
      const departamentosFiltrados = this._departamentosList.filter(d => d.ID !== idDepartamentoEliminar);
      this._departamentosList = departamentosFiltrados;
    } catch (error) {
      console.error("Error al eliminar departamento:", error);
      throw error;
    } finally {
      this._isLoading = false;
    }
  }
}