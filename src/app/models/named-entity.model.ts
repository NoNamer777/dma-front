import { Entity } from './entity.model';

export class NamedEntity extends Entity {

  name = '';

  equals(object: object): boolean {
    if (this === object) return true;

    if (object == null || !(object instanceof NamedEntity)) return false;

    const other = object as NamedEntity;

    if (other.id == null || this.id == null) return this.name === other.name;
    else return super.equals(object);
  }
}
