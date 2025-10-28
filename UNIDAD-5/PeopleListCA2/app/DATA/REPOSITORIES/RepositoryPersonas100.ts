import { Persona } from "../../DOMAIN/ENTITIES/Persona";
import { IRepositoryPersonas } from "../../DOMAIN/REPOSITORIES/IRepositoryPersona"

/**
 * Clase que crea un repositorio con una lista de personas
 * que a su vez implementa la interfaz IRepositoryPersonas
 * que permitirá pasar dicho listado al ViewModel incluso
 * si esta clase no debe verlo
 */
class RepositoryPersona100 implements IRepositoryPersonas {

    /**
     * Método que crea un listado de 100 personas
     * @returns Un array con un listado inventado de 100 personas
     */
    ListaPersonas100(): Persona[] {
        
        //#region REURN CON 100 PERSONAS

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
            new Persona(10, "Camila", "Morales", 26),
            new Persona(11, "Fernando", "Vargas", 33),
            new Persona(12, "Daniela", "Mendoza", 24),
            new Persona(13, "Alejandro", "Silva", 30),
            new Persona(14, "Laura", "Reyes", 20),
            new Persona(15, "Ricardo", "García", 27),
            new Persona(16, "Paula", "Navarro", 32),
            new Persona(17, "Diego", "Herrera", 25),
            new Persona(18, "Carolina", "Martínez", 29),
            new Persona(19, "Héctor", "Jiménez", 35),
            new Persona(20, "Natalia", "Campos", 23),
            new Persona(21, "Esteban", "Ruiz", 31),
            new Persona(22, "Gabriela", "Cortés", 28),
            new Persona(23, "Sergio", "Arias", 24),
            new Persona(24, "Patricia", "Rivas", 33),
            new Persona(25, "Luis", "Santos", 30),
            new Persona(26, "Elena", "Carrillo", 26),
            new Persona(27, "Adrián", "Ortega", 22),
            new Persona(28, "Julia", "Núñez", 25),
            new Persona(29, "Tomás", "Paredes", 29),
            new Persona(30, "Florencia", "Salazar", 27),
            new Persona(31, "Iván", "Rosales", 32),
            new Persona(32, "Daniel", "Mora", 23),
            new Persona(33, "Victoria", "Aguilar", 21),
            new Persona(34, "Raúl", "Cano", 34),
            new Persona(35, "Emilia", "Benítez", 24),
            new Persona(36, "Mauricio", "Peña", 30),
            new Persona(37, "Josefina", "Bravo", 28),
            new Persona(38, "Rodrigo", "Acosta", 33),
            new Persona(39, "Martina", "Vega", 22),
            new Persona(40, "Cristian", "Figueroa", 25),
            new Persona(41, "Renata", "Espinoza", 26),
            new Persona(42, "Felipe", "Romero", 27),
            new Persona(43, "Teresa", "Mejía", 29),
            new Persona(44, "Gonzalo", "Muñoz", 31),
            new Persona(45, "Angela", "Miranda", 24),
            new Persona(46, "Pablo", "Tapia", 30),
            new Persona(47, "Claudia", "Roldán", 33),
            new Persona(48, "Sebastián", "Campos", 20),
            new Persona(49, "Lorena", "Ibáñez", 25),
            new Persona(50, "Francisco", "Ramos", 28),
            new Persona(51, "Isabel", "Cruz", 22),
            new Persona(52, "Oscar", "Delgado", 29),
            new Persona(53, "Carla", "León", 26),
            new Persona(54, "Eduardo", "Rico", 34),
            new Persona(55, "Pilar", "Arce", 30),
            new Persona(56, "Julio", "Zamora", 32),
            new Persona(57, "Alejandra", "Fuentes", 21),
            new Persona(58, "Nicolás", "Rivas", 24),
            new Persona(59, "Antonia", "Orozco", 27),
            new Persona(60, "Gabriel", "Montes", 25),
            new Persona(61, "Mónica", "Villalobos", 28),
            new Persona(62, "Agustín", "Reina", 29),
            new Persona(63, "Daniela", "Suárez", 23),
            new Persona(64, "Matías", "Román", 31),
            new Persona(65, "Beatriz", "Maldonado", 30),
            new Persona(66, "Leonardo", "Beltrán", 26),
            new Persona(67, "Rocío", "Peralta", 33),
            new Persona(68, "Emilio", "Zúñiga", 25),
            new Persona(69, "Tamara", "Pacheco", 22),
            new Persona(70, "Iván", "Del Valle", 27),
            new Persona(71, "Cecilia", "Herrera", 24),
            new Persona(72, "Hugo", "Moreno", 32),
            new Persona(73, "Inés", "Rangel", 28),
            new Persona(74, "Samuel", "Domínguez", 34),
            new Persona(75, "Marta", "Aguirre", 21),
            new Persona(76, "Cristóbal", "Escobar", 29),
            new Persona(77, "Verónica", "Camacho", 23),
            new Persona(78, "Julian", "Solís", 31),
            new Persona(79, "Noelia", "Bermúdez", 25),
            new Persona(80, "Alberto", "Serrano", 30),
            new Persona(81, "Marina", "Huerta", 27),
            new Persona(82, "Fabián", "Ponce", 22),
            new Persona(83, "Adela", "Velázquez", 26),
            new Persona(84, "Oscar", "Maldonado", 28),
            new Persona(85, "Diana", "Carrasco", 24),
            new Persona(86, "Rafael", "Soto", 33),
            new Persona(87, "Vanessa", "Palacios", 29),
            new Persona(88, "Ramiro", "Peña", 32),
            new Persona(89, "Luz", "Correa", 23),
            new Persona(90, "Benjamín", "Campos", 21),
            new Persona(91, "Alicia", "Navarro", 27),
            new Persona(92, "Martín", "Rey", 31),
            new Persona(93, "Clara", "Salinas", 22),
            new Persona(94, "Álvaro", "Jiménez", 28),
            new Persona(95, "Daniela", "Del Río", 30),
            new Persona(96, "Ricardo", "Gálvez", 34),
            new Persona(97, "Estela", "Morales", 25),
            new Persona(98, "Joaquín", "Paredes", 29),
            new Persona(99, "Carolina", "Luna", 26),
            new Persona(100, "Federico", "Sánchez", 32)
        ];

        //#endregion

    }

    /**
     * El método de la interfaz es implementado donde se llama al
     * constructor de la propia clase
     * @returns Un listado de personas creado en el constructor de la clase
     * el cual se podrá pasar al view model gracias a su implementacion
     */
    GetListPersonas(): Persona[] {
        return this.ListaPersonas100()
    }

}