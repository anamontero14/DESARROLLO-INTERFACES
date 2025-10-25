// La interfaz se define en la capa de Domain para que la capa de Data (PersonasRepository) la implemente.
import { Persona } from "../entities/Persona";

export interface IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[];
}