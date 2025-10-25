import { injectable } from "inversify";
// Importamos la Entidad desde Domain
import { Persona } from "../../domain/entities/Persona";
// Importamos la Interfaz desde Domain
import { IRepositoryPersonas } from "../../domain/interfaces/IRepositoryPersonas";


// Implementación concreta del Repositorio (es parte de la capa Data/Infraestructura)

@injectable()
export class PersonasRepository implements IRepositoryPersonas {

    getListadoCompletoPersonas(): Persona[] {

        //En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
        ];
    }
}

//clase que servirá para realizar pruebas usando la interfaz IRepositoryPersonas
//esta en concreto no pasará ninguna lista para testear errores
export class PersonasRepositoryEmpty implements IRepositoryPersonas {

    //llamo al método de la interfaz IRepositoryPersonas pero no le paso ninguna personas
    getListadoCompletoPersonas(): Persona[] {
        return [];
    }

}

//clase que contiene 100 personas para realizar pruebas
export class PersonasRepository100 implements IRepositoryPersonas {

    getListadoCompletoPersonas(): Persona[] {
        //#region  RETURN DE 100 PERSONAS
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
            new Persona(7, 'Elena', 'Gómez Castro'),
            new Persona(8, 'Javier', 'Romero Navarro'),
            new Persona(9, 'Isabel', 'Vargas Molina'),
            new Persona(10, 'Pablo', 'Ortega Silva'),
            new Persona(11, 'Sofia', 'Mendoza Rios'),
            new Persona(12, 'Daniel', 'Herrera Vega'),
            new Persona(13, 'Carmen', 'Cruz Campos'),
            new Persona(14, 'Alejandro', 'Flores Reyes'),
            new Persona(15, 'Rosa', 'Guerrero Mora'),
            new Persona(16, 'Sergio', 'Paredes León'),
            new Persona(17, 'Teresa', 'Ramos Fuentes'),
            new Persona(18, 'Raúl', 'Acosta Medina'),
            new Persona(19, 'Patricia', 'Nuñez Ortega'),
            new Persona(20, 'Alberto', 'Jiménez Ponce'),
            new Persona(21, 'Marta', 'Santos Rivas'),
            new Persona(22, 'Francisco', 'López Gil'),
            new Persona(23, 'Cristina', 'Díaz Marín'),
            new Persona(24, 'Juan', 'Morales Soto'),
            new Persona(25, 'Eva', 'Vega Cortés'),
            new Persona(26, 'José', 'Castillo Peña'),
            new Persona(27, 'Nuria', 'Rivera Bravo'),
            new Persona(28, 'Luis', 'Ojeda Montes'),
            new Persona(29, 'Olga', 'Cortés Pacheco'),
            new Persona(30, 'Ricardo', 'Méndez Rueda'),
            new Persona(31, 'Silvia', 'Aguilar Salas'),
            new Persona(32, 'Víctor', 'Reyes Cabrera'),
            new Persona(33, 'Beatriz', 'Soto Lozano'),
            new Persona(34, 'Manuel', 'Gil Serrano'),
            new Persona(35, 'Lorena', 'Marín Valencia'),
            new Persona(36, 'Jorge', 'Bravo Iglesias'),
            new Persona(37, 'Raquel', 'Pacheco Calvo'),
            new Persona(38, 'Adrián', 'Montes Arias'),
            new Persona(39, 'Natalia', 'Rueda Pastor'),
            new Persona(40, 'Diego', 'Salas Montero'),
            new Persona(41, 'Clara', 'Cabrera Gallego'),
            new Persona(42, 'Ángel', 'Lozano Vidal'),
            new Persona(43, 'Marina', 'Serrano Carmona'),
            new Persona(44, 'Roberto', 'Valencia Montesinos'),
            new Persona(45, 'Inés', 'Iglesias Ferrer'),
            new Persona(46, 'Gabriel', 'Calvo Soria'),
            new Persona(47, 'Concha', 'Arias Rojo'),
            new Persona(48, 'Héctor', 'Pastor Delgado'),
            new Persona(49, 'Lidia', 'Montero Redondo'),
            new Persona(50, 'Marcos', 'Gallego Nieto'),
            new Persona(51, 'Julia', 'Vidal Pujol'),
            new Persona(52, 'Iván', 'Carmona Lara'),
            new Persona(53, 'Alicia', 'Montesinos Moya'),
            new Persona(54, 'Óscar', 'Ferrer Quintana'),
            new Persona(55, 'Miriam', 'Soria Beltrán'),
            new Persona(56, 'Rubén', 'Rojo Velasco'),
            new Persona(57, 'Celia', 'Delgado Márquez'),
            new Persona(58, 'Félix', 'Redondo Crespo'),
            new Persona(59, 'Esther', 'Nieto Palma'),
            new Persona(60, 'Samuel', 'Pujol Roldán'),
            new Persona(61, 'Noelia', 'Lara Soler'),
            new Persona(62, 'Guillermo', 'Moya Mesa'),
            new Persona(63, 'Rocío', 'Quintana Esteban'),
            new Persona(64, 'Hugo', 'Beltrán Andrés'),
            new Persona(65, 'Verónica', 'Velasco Segura'),
            new Persona(66, 'Alfonso', 'Márquez Prieto'),
            new Persona(67, 'Yolanda', 'Crespo Benítez'),
            new Persona(68, 'Emilio', 'Palma Gutiérrez'),
            new Persona(69, 'Gloria', 'Roldán Marcos'),
            new Persona(70, 'Fermín', 'Soler Pascual'),
            new Persona(71, 'Aurora', 'Mesa Herrero'),
            new Persona(72, 'Nicolás', 'Esteban Santos'),
            new Persona(73, 'Esperanza', 'Andrés Llamas'),
            new Persona(74, 'Rodrigo', 'Segura Polo'),
            new Persona(75, 'Begoña', 'Prieto Roca'),
            new Persona(76, 'Saúl', 'Benítez Pozo'),
            new Persona(77, 'Maribel', 'Gutiérrez Cano'),
            new Persona(78, 'César', 'Marcos Rubio'),
            new Persona(79, 'Lourdes', 'Pascual Sáez'),
            new Persona(80, 'Arturo', 'Herrero Mateo'),
            new Persona(81, 'Montserrat', 'Santos Mora'),
            new Persona(82, 'Jaime', 'Llamas Villar'),
            new Persona(83, 'Pilar', 'Polo Escudero'),
            new Persona(84, 'Ignacio', 'Roca Barrios'),
            new Persona(85, 'Consuelo', 'Pozo Carrasco'),
            new Persona(86, 'Teodoro', 'Cano Gallardo'),
            new Persona(87, 'Amparo', 'Rubio Vázquez'),
            new Persona(88, 'Valentín', 'Sáez Parra'),
            new Persona(89, 'Soledad', 'Mateo Sierra'),
            new Persona(90, 'Federico', 'Mora Maldonado'),
            new Persona(91, 'Trinidad', 'Villar Suárez'),
            new Persona(92, 'Ramiro', 'Escudero Ramírez'),
            new Persona(93, 'Asunción', 'Barrios Peinado'),
            new Persona(94, 'Bernardo', 'Carrasco Cuesta'),
            new Persona(95, 'Milagros', 'Gallardo Arroyo'),
            new Persona(96, 'Leandro', 'Vázquez Rovira'),
            new Persona(97, 'Candelaria', 'Parra Alba'),
            new Persona(98, 'Saturnino', 'Sierra Ballesteros'),
            new Persona(99, 'Paz', 'Maldonado Téllez'),
            new Persona(100, 'Honorio', 'Suárez Zamora')
        ];
        //#endregion
    }
}