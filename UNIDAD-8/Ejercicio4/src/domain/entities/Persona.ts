// src/domain/entities/Persona.ts

export class Persona {
  private readonly _ID: number;
  private _Nombre: string;
  private _Apellidos: string;
  private _Telefono: string;
  private _Direccion: string;
  private _Foto: string;
  private _FechaNacimiento: Date;
  private _IDDepartamento: number;

  constructor(
    ID: number,
    Nombre: string,
    Apellidos: string,
    Telefono: string,
    Direccion: string,
    Foto: string,
    FechaNacimiento: Date,
    IDDepartamento: number
  ) {
    this._ID = ID;
    this._Nombre = Nombre;
    this._Apellidos = Apellidos;
    this._Telefono = Telefono;
    this._Direccion = Direccion;
    this._Foto = Foto;
    this._FechaNacimiento = FechaNacimiento;
    this._IDDepartamento = IDDepartamento;
  }

  get ID(): number {
    return this._ID;
  }

  get Nombre(): string {
    return this._Nombre;
  }

  set Nombre(value: string) {
    this._Nombre = value;
  }

  get Apellidos(): string {
    return this._Apellidos;
  }

  set Apellidos(value: string) {
    this._Apellidos = value;
  }

  get Telefono(): string {
    return this._Telefono;
  }

  set Telefono(value: string) {
    this._Telefono = value;
  }

  get Direccion(): string {
    return this._Direccion;
  }

  set Direccion(value: string) {
    this._Direccion = value;
  }

  get Foto(): string {
    return this._Foto;
  }

  set Foto(value: string) {
    this._Foto = value;
  }

  get FechaNacimiento(): Date {
    return this._FechaNacimiento;
  }

  set FechaNacimiento(value: Date) {
    this._FechaNacimiento = value;
  }

  get IDDepartamento(): number {
    return this._IDDepartamento;
  }

  set IDDepartamento(value: number) {
    this._IDDepartamento = value;
  }
}