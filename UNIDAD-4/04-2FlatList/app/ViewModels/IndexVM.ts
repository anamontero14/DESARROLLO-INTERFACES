import { Persona } from "../Models/Entities/PersonaModel";
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";

export class IndexVM {

  private _personaSeleccionada: Persona | null = null;

  // Devuelve todas las personas
  get Personas(): Persona[] {
    return RepositoryPersona.Personas;
  }

  get personaSeleccionada(): Persona | null{
    return this._personaSeleccionada;
  }

  set personaSeleccionada(value: Persona){
    this._personaSeleccionada = value
    this.muestraPersona()
  }

  private muestraPersona() {
    if (this._personaSeleccionada != null){
      alert(`Nombre: ${this._personaSeleccionada?.nombre} | Apellido: ${this._personaSeleccionada.apellido} | ID: ${this._personaSeleccionada.id}`)
    }
  }
}