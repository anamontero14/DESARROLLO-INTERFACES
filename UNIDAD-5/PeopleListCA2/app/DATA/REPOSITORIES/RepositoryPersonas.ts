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
     * Método que crea un listado de personas
     * @returns Un array con un listado inventado de personas
     */
    ListaPersonas(): Persona[] {
        return [
            new Persona(1, "Juan", "Pérez", 23),
            new Persona(2, "María", "Gómez", 27),
            new Persona(3, "Carlos", "Ramírez", 31),
            new Persona(4, "Lucía", "Fernández", 22),
            new Persona(5, "Andrés", "Torres", 29),
            new Persona(6, "Sofía", "López", 25),
            new Persona(7, "Miguel", "Díaz", 34),
            new Persona(8, "Valentina", "Rojas", 21),
            new Persona(9, "Javier", "Castro", 28),
            new Persona(10, "Camila", "Morales", 26)
        ];
    }

    /**
     * El método de la interfaz es implementado donde se llama al
     * constructor de la propia clase
     * @returns Un listado de personas creado en el constructor de la clase
     * el cual se podrá pasar al view model gracias a su implementacion
     */
    GetListPersonas(): Persona[] {
        return this.ListaPersonas()
    }

}