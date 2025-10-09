import { Persona } from "../Entities/PersonaModel";

export class RepositoryPersona {
  // Método estático que devuelve un array de Persona
  static getPersonas(): Persona[] {
    return [
      new Persona(1, "Carlos", "Pérez"),
      new Persona(2, "María", "Gómez"),
      new Persona(3, "Juan", "Rodríguez"),
      new Persona(4, "Lucía", "Fernández"),
      new Persona(5, "Andrés", "Torres"),
    ];
  }
}
