import { injectable, inject } from 'inversify';
import { IChatRepository } from '../repositories/IChatRepository';
import { TYPES } from '../../core/types';
import { clsMensajeUsuario } from '../entities/clsMensajeUsuario';

// marca la clase como inyectable
@injectable()
export class SendMessageUseCase {
  // recibe el repositorio por inyección de dependencias
  constructor(@inject(TYPES.IChatRepository) private repository: IChatRepository) {}

  // ejecuta el envío del mensaje
  async execute(claseUsuario: clsMensajeUsuario): Promise<void> {
    // validación de regla de negocio
    if (!claseUsuario.nombre || !claseUsuario.mensaje) {
      throw new Error("Usuario y mensaje son requeridos");
    }
    
    await this.repository.sendMessage(claseUsuario);
  }
}