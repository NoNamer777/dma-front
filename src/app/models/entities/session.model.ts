import { Entity } from '../entity.model';

export class Session extends Entity {

  token = '';

  isInitialized(): boolean {
    return this.id != null && this.id !== '';
  }
}
