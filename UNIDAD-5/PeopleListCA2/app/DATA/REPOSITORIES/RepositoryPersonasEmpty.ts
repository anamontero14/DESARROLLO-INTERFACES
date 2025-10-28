import { Persona } from "../../DOMAIN/ENTITIES/Persona";
import { IRepositoryPersonas } from "../../DOMAIN/REPOSITORIES/IRepositoryPersona"

/**
 * Clase que crea un repositorio con una lista de personas
 * que a su vez implementa la interfaz IRepositoryPersonas
 * que permitirá pasar dicho listado al ViewModel incluso
 * si esta clase no debe verlo
 */
class RepositoryPersona implements IRepositoryPersonas {

    /**
     * Método que crea un listado de personas vacío
     * @returns Un array con un listado vacío de personas
     */
    ListaPersonasEmpty(): Persona[] {
        return [
        ];
    }

    /**
     * El método de la interfaz es implementado donde se llama al
     * constructor de la propia clase
     * @returns Un listado de personas creado en el constructor de la clase
     * el cual se podrá pasar al view model gracias a su implementacion
     */
    GetListPersonas(): Persona[] {
        return this.ListaPersonasEmpty()
    }

}