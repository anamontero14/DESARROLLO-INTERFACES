// src/data/datasource/PersonaBDAPI.ts

import { injectable } from "inversify";
import { Persona } from "../../domain/entities/Persona";
import { Departamento } from "../../domain/entities/Departamento";

@injectable()
export class PersonaBDAPI {
  private readonly API_URL: string = "https://montero-hzedh8ahesg5cceh.francecentral-01.azurewebsites.net/API/";

  async fetchPersonaList(): Promise<Persona[]> {
    let resultado: Persona[] = [];

    try {
      const response = await fetch(`${this.API_URL}/Persona/`);
      const data = await response.json();
      resultado = this.mapearPersonas(data);
    } catch (error) {
      console.error("Error al obtener persona:", error);
      resultado = [];
    }

    return resultado;
  }

  async fetchDepartamentoList(): Promise<Departamento[]> {
    let resultado: Departamento[] = [];

    try {
      const response = await fetch(`${this.API_URL}/Departamento/`);
      const data = await response.json();
      resultado = this.mapearDepartamentos(data);
    } catch (error) {
      console.error("Error al obtener departamentos:", error);
      resultado = [];
    }

    return resultado;
  }

  private mapearPersonas(data: any[]): Persona[] {
  return data.map((item) => {
    const fecha = item.fechaNacimiento
      ? new Date(item.fechaNacimiento)
      : null;

      return new Persona(
        item.id,
        item.nombre,
        item.apellidos,
        item.telefono,
        item.idDepartamento,
        item.direccion,
        item.foto,
        fecha
      );
    });
  }

  private mapearDepartamentos(data: any[]): Departamento[] {
    const departamentos = data.map((item) => {
      return new Departamento(item.id, item.nombre);
    });
    return departamentos;
  }

  async insertPersona(persona: Persona): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Persona`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: persona.Nombre,
          apellidos: persona.Apellidos,
          telefono: persona.Telefono,
          direccion: persona.Direccion,
          foto: persona.Foto,
          fechaNacimiento: persona.FechaNacimiento,
          idDepartamento: persona.IDDepartamento,
        }),
      });
      const data = await response.json();
      resultado = data.id || 1;
    } catch (error) {
      console.error("Error al insertar persona:", error);
      resultado = 0;
    }

    return resultado;
  }

  async updatePersona(id: number, persona: Persona): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Persona/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: persona.Nombre,
          apellidos: persona.Apellidos,
          telefono: persona.Telefono,
          direccion: persona.Direccion,
          foto: persona.Foto,
          fechaNacimiento: persona.FechaNacimiento,
          idDepartamento: persona.IDDepartamento,
        }),
      });
      resultado = response.ok ? 1 : 0;
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      resultado = 0;
    }

    return resultado;
  }

  async insertDepartamento(departamento: Departamento): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Departamento/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: departamento.Nombre,
        }),
      });
      const data = await response.json();
      resultado = data.id || 1;
    } catch (error) {
      console.error("Error al insertar departamento:", error);
      resultado = 0;
    }

    return resultado;
  }

  async updateDepartamento(id: number, departamento: Departamento): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Departamento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: departamento.Nombre,
        }),
      });
      resultado = response.ok ? 1 : 0;
    } catch (error) {
      console.error("Error al actualizar departamento:", error);
      resultado = 0;
    }

    return resultado;
  }

  async deletePersona(id: number): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Persona/${id}`, {
        method: "DELETE",
      });
      resultado = response.ok ? 1 : 0;
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      resultado = 0;
    }

    return resultado;
  }

  async deleteDepartamento(id: number): Promise<number> {
    let resultado = 0;

    try {
      const response = await fetch(`${this.API_URL}/Departamento/${id}`, {
        method: "DELETE",
      });
      resultado = response.ok ? 1 : 0;
    } catch (error) {
      console.error("Error al eliminar departamento:", error);
      resultado = 0;
    }

    return resultado;
  }

  //función asíncrona para contar personas en departamento
  async countPersonasByDepartamento(idDepartamento: number): Promise<number> {
    const personas = await this.fetchPersonaList();
    return personas.filter(p => p.IDDepartamento === idDepartamento).length;
  }

}