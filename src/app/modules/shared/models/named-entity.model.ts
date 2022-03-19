import { coerceStringProperty } from '@dma-shared';
import { Entity } from './entity.model';

export class NamedEntity extends Entity {
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = coerceStringProperty(name);
    }
    private _name: string;

    constructor(id: string = null, name: string = null) {
        super(id);

        this.name = name;
    }
}
