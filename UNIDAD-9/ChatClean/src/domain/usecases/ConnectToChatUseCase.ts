import { injectable, inject } from 'inversify';
import { IChatRepository } from '../repositories/IChatRepository';
import { TYPES } from '../../core/types';

// marca la clase como inyectable
@injectable()
export class ConnectToChatUseCase {
  // recibe el repositorio por inyección de dependencias
  constructor(@inject(TYPES.IChatRepository) private repository: IChatRepository) {}

  // ejecuta la conexión
  async execute(): Promise<void> {
    await this.repository.connect();
  }
}