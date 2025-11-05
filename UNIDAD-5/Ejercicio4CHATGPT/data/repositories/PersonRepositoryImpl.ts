import { IPersonRepository } from "../../domain/interfaces/repositories/IPersonRepository";
import { Person } from "../../domain/entities/Person";

export class PersonRepositoryImpl implements IPersonRepository {
  private persons: Person[] = [
    new Person(1, "Ana", "García", new Date("1990-01-10")),
    new Person(2, "Luis", "Pérez", new Date("1988-03-22")),
    new Person(3, "Marta", "López", new Date("1995-07-15")),
    new Person(4, "Javier", "Hernández", new Date("1992-11-09")),
    new Person(5, "Sofía", "Martín", new Date("1998-09-30")),
    new Person(6, "Carlos", "Ruiz", new Date("1985-05-04")),
    new Person(7, "Elena", "Torres", new Date("1993-12-19")),
  ];

  public getAllPersons(): Person[] {
    return this.persons;
  }
}
