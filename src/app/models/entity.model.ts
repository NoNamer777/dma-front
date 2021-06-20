export class Entity {

  id = '';

  equals(object: object): boolean {
    if (object == null || !(object instanceof Entity)) return false;
    if (object === this) return true;

    const other = object as Entity;

    return this.id == other.id;
  }
}
