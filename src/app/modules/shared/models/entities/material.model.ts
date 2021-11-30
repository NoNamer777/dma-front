import { Entity } from '../entity.model';

export class Material extends Entity {
    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
    private _description: string;
}
