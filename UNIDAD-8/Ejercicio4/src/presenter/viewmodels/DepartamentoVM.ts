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
    this._departamentoSeleccionado = departamento;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async cargarDepartamentos(): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      const departamentos = await this._casoDeUsoDepartamento.getAllDepartamentos();
      
      runInAction(() => {
        this._departamentosList = departamentos;
      });
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async crearDepartamento(departamento: Departamento): Promise<void> {
    runInAction(() => {
      //el circulo de cargar se pone a true porque se tiene que mostrar
      //ya que se están cargando datos de la BBDD
      this._isLoading = true;
    })
    //se llama a la función de crear personas con el caso de uso
    //mandándole el departamento nuevo
    await this._casoDeUsoDepartamento.insertarDepartamento(departamento)
    //y se vuelven a cargar los departamentos
    await this.cargarDepartamentos()
    runInAction(() => {
      //y el circulito de cargar se va porque ya se ha creado la persona
      this._isLoading = false; 
    })
  }

  async editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    })
    await this._casoDeUsoDepartamento.editarDepartamento(idDepartamentoEditar, departamento)
    await this.cargarDepartamentos()
    runInAction(() => {
      //y el circulito de cargar se va porque ya se ha creado la persona
      this._isLoading = false; 
    })
  }

  async eliminarDepartamento(idDepartamentoEliminar: number): Promise<void> {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      await this._casoDeUsoDepartamento.eliminarDepartamento(idDepartamentoEliminar);
      
      runInAction(() => {
        this._departamentosList = this._departamentosList.filter(d => d.ID !== idDepartamentoEliminar);
      });
    } catch (error) {
      console.error("Error al eliminar departamento:", error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}