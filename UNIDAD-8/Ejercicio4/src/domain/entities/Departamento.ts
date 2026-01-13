// src/domain/entities/Departamento.ts

export class Departamento {
  private _ID: number;
  private _Nombre: string;

  constructor(ID: number, Nombre: string) {
    this._ID = ID;
    this._Nombre = Nombre;
  }

  get ID(): number {
    return this._ID;
  }

  set ID(value: number) {
    this._ID = value;
  }

  get Nombre(): string {
    return this._Nombre;
  }

  set Nombre(value: string) {
    this._Nombre = value;
  }
}