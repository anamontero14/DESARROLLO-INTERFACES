import { Person } from "../../entities/Person";

export interface IPersonOutput {
  presentPerson(person: Person): void;
}
