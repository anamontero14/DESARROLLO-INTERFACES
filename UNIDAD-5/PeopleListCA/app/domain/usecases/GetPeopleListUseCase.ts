import { inject, injectable } from "inversify";
import { Persona } from "../entities/Persona";
import { IRepositoryPersonas } from "../interfaces/IRepositoryPersonas";
import { TYPES } from "../../core/types";

// Los Casos de Uso (Use Cases) son la capa de la Lógica de Negocio (Domain).
// Contienen reglas de negocio específicas de la aplicación.
@injectable()
export class GetPeopleListUseCase {
    
    // Inyectamos la interfaz del repositorio definida en Domain.
    constructor(@inject(TYPES.IRepositoryPersonas) private repositoryPersonas: IRepositoryPersonas) {}

    // El método 'execute' es la función principal del Caso de Uso.
    execute(): Persona[] {
        // La lógica de negocio es simplemente obtener la lista a través del repositorio.
        return this.repositoryPersonas.getListadoCompletoPersonas();
    }
}