// src/domain/entities/clsMensajeUsuario.ts

export class clsMensajeUsuario {
  private _nombre: string;
  private _mensaje: string;

  constructor(nombre: string, mensaje: string) {
    this._nombre = nombre;
    this._mensaje = mensaje;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get mensaje(): string {
    return this._mensaje;
  }

  set mensaje(value: string) {
    this._mensaje = value;
  }
}