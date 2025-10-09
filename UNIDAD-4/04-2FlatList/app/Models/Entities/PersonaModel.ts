
export class Persona {
  private _id: number;
  private _nombre: string;
  private _apellido: string;

  constructor(id: number, nombre: string, apellido: string) {
    this._id = id;
    this._nombre = nombre;
    this._apellido = apellido;
  }

  // Getter para id (solo lectura)
  get id(): number {
    return this._id;
  }

  // Getter y Setter para nombre
  get nombre(): string {
    return this._nombre;
  }

  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }

  // Getter y Setter para apellido
  get apellido(): string {
    return this._apellido;
  }

  set apellido(nuevoApellido: string) {
    this._apellido = nuevoApellido;
  }
}
