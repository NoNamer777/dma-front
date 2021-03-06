import { coerceStringProperty } from '@dma-shared';

export class Entity {
    public get id(): string {
        return this._id;
    }
    private _id: string;

    constructor(id: string = null) {
        this._id = coerceStringProperty(id);
    }
}
