import { Person } from "../../entities/Person";

export interface IPersonRepository {
  getAllPersons(): Person[];
}
