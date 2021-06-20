import { Entity } from './entity.model';

export class NamedEntity extends Entity {

  name = '';

  equals(object: object): boolean {
    if (object == null || !(object instanceof NamedEntity)) return false;
    if (object === this) return true;

    const other = object as NamedEntity;

    if (this.id == null || other.id == null) return this.name == other.name;
    else return super.equals(other);
  }
}
