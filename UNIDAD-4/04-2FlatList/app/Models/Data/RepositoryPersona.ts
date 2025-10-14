import { Persona } from "../Entities/PersonaModel";

export class RepositoryPersona {
  /**
   * Función estática ue devuelve un listado de personas
   * pre: nada
   * post: no puede estar vacío
   */
  static get Personas(): Persona[] {
    return [
      new Persona(1, "Carlos", "Pérez"),
      new Persona(2, "María", "Gómez"),
      new Persona(3, "Juan", "Rodríguez"),
      new Persona(4, "Lucía", "Fernández"),
      new Persona(5, "Andrés", "Torres"),
    ];
  }
}
