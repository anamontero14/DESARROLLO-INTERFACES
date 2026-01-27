import { injectable, inject } from 'inversify';
import { clsMensajeUsuario } from '../entities/clsMensajeUsuario';
import { IChatRepository } from '../repositories/IChatRepository';
import { TYPES } from '../../core/types';

// marca la clase como inyectable
@injectable()
export class SubscribeToMessagesUseCase {
  // recibe el repositorio por inyección de dependencias
  constructor(@inject(TYPES.IChatRepository) private repository: IChatRepository) {}

  // ejecuta la suscripción pasando un callback
  execute(callback: (message: clsMensajeUsuario) => void): void {
    this.repository.onMessageReceived(callback);
  }
}