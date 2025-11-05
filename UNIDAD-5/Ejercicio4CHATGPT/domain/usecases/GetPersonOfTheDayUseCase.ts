import { IPersonRepository } from "../interfaces/repositories/IPersonRepository";
import { IPersonOutput } from "../interfaces/usecases/IPersonOutput";
import { Person } from "../entities/Person";

export class GetPersonOfTheDayUseCase {
  private repository: IPersonRepository;
  private output: IPersonOutput;

  constructor(repository: IPersonRepository, output: IPersonOutput) {
    this.repository = repository;
    this.output = output;
  }

  public execute(): void {
    const persons: Person[] = this.repository.getAllPersons();
    const todayIndex = new Date().getDay(); // 0 = Domingo, 6 = Sábado
    const personOfTheDay = persons[todayIndex];
    this.output.presentPerson(personOfTheDay);
  }
}
