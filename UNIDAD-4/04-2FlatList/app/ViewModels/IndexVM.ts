import { Persona } from "../Models/Entities/PersonaModel";
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";

export class IndexVM {
  
  // Devuelve todas las personas
  getPersonas(): Persona[] {
    return RepositoryPersona.getPersonas();
  }

  // Devuelve una persona específica por id
  getPersonasPorId(id: number): Persona | undefined {
    const personas = RepositoryPersona.getPersonas();
    return personas.find(persona => persona.id === id);
  }
}
