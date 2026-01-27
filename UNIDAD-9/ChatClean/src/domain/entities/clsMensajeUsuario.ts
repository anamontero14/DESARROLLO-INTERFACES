// src/domain/entities/clsMensajeUsuario.ts
export class clsMensajeUsuario {
  public nombre: string;
  public mensaje: string;

  constructor(nombre: string, mensaje: string) {
    this.nombre = nombre;
    this.mensaje = mensaje;
  }
}