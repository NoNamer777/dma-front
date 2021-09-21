import { coerceNumberProperty } from '@angular/cdk/coercion';
import { coerceStringProperty } from '@dma-shared';
import { Entity } from '../entity.model';

export class Description extends Entity {
    public get order(): number {
        return this._order;
    }
    public set order(order: number) {
        this._order = coerceNumberProperty(order);
    }
    private _order: number;

    public get title(): string {
        return this._title;
    }
    public set title(title: string) {
        this._title = coerceStringProperty(title);
    }
    private _title: string;

    public get text(): string {
        return this._text;
    }
    public set text(text: string) {
        this._text = coerceStringProperty(text);
    }
    private _text: string;

    constructor(id?: string) {
        super(id);
    }
}
