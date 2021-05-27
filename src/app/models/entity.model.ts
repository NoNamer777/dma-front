export class Entity {

  id = '';

  constructor(id?: string) {
    if (id != null) this.id = id;
  }

  equals(object: object): boolean {
    if (this === object) return true;

    if (object == null || !(object instanceof Entity)) return false;

    const other = object as Entity;

    return other.id == this.id;
  }
}
