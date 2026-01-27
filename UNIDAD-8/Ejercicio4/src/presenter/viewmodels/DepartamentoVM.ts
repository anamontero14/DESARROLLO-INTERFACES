// src/presenter/viewmodels/DepartamentoVM.ts

import { injectable, inject } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
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
    runInAction(() => {
      this._departamentoSeleccionado = departamento;
    });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async cargarDepartamentos(): Promise<void> {
    this.activarCarga();

    try {
      const departamentos = await this._casoDeUsoDepartamento.getAllDepartamentos();
      this.actualizarListaDepartamentos(departamentos);
    } catch (error) {
      console.error("error al cargar departamentos:", error);
      throw error;
    } finally {
      this.desactivarCarga();
    }
  }

  async crearDepartamento(departamento: Departamento): Promise<void> {
    this.activarCarga();

    try {
      await this._casoDeUsoDepartamento.insertarDepartamento(departamento);
      await this.cargarDepartamentos();
    } catch (error) {
      console.error("error al crear departamento:", error);
      throw error;
    } finally {
      this.desactivarCarga();
    }
  }

  async editarDepartamento(idDepartamento: number, departamento: Departamento): Promise<void> {
    this.activarCarga();

    try {
      await this._casoDeUsoDepartamento.editarDepartamento(idDepartamento, departamento);
      await this.cargarDepartamentos();
    } catch (error) {
      console.error("error al editar departamento:", error);
      throw error;
    } finally {
      this.desactivarCarga();
    }
  }

  async eliminarDepartamento(idDepartamento: number): Promise<void> {
    this.activarCarga();

    try {
      const resultado = await this._casoDeUsoDepartamento.eliminarDepartamento(idDepartamento);
      
      if (this.esEliminacionFallida(resultado)) {
        throw new Error("No se puede eliminar el departamento porque tiene personas asociadas");
      }
      
      await this.cargarDepartamentos();
    } catch (error) {
      console.error("error al eliminar departamento:", error);
      throw error;
    } finally {
      this.desactivarCarga();
    }
  }

  private activarCarga(): void {
    runInAction(() => {
      this._isLoading = true;
    });
  }

  private desactivarCarga(): void {
    runInAction(() => {
      this._isLoading = false;
    });
  }

  private actualizarListaDepartamentos(departamentos: Departamento[]): void {
    runInAction(() => {
      this._departamentosList = departamentos;
    });
  }

  private esEliminacionFallida(resultado: number): boolean {
    return resultado === -1;
  }
}