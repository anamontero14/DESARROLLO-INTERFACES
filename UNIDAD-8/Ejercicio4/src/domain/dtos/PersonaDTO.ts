
// src/domain/dtos/PersonaDTO.ts

export interface PersonaDTO {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Telefono: string;
  Direccion: string;
  Foto: string;
  FechaNacimiento: Date;
  IDDepartamento: number;
  NombreDepartamento: string;
}