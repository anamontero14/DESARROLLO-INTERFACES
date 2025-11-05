export class Person {
  private id: number;
  private nombre: string;
  private apellido: string;
  private fechaNacimiento: Date;

  constructor(id: number, nombre: string, apellido: string, fechaNacimiento: Date) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setApellido(apellido: string): void {
    this.apellido = apellido;
  }

  public setFechaNacimiento(fechaNacimiento: Date): void {
    this.fechaNacimiento = fechaNacimiento;
  }
}
