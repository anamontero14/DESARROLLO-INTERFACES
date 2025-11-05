import { IPersonRepository } from "../domain/interfaces/repositories/IPersonRepository";
import { PersonRepositoryImpl } from "../data/repositories/PersonRepositoryImpl";
import { GetPersonOfTheDayUseCase } from "../domain/usecases/GetPersonOfTheDayUseCase";

class Container {
  private personRepository: IPersonRepository;

  constructor() {
    this.personRepository = new PersonRepositoryImpl();
  }

  public getPersonOfTheDayUseCase(): GetPersonOfTheDayUseCase {
    return new GetPersonOfTheDayUseCase(this.personRepository);
  }
}

export const container = new Container();
