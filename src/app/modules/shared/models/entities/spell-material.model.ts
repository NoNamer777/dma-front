import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { Material } from './material.model';

export class SpellMaterial {
    get order(): number {
        return this._order;
    }

    set order(value: number) {
        this._order = coerceNumberProperty(value);
    }
    private _order = 0;

    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = coerceNumberProperty(value);
    }
    private _cost = 0.0;

    get consumed(): boolean {
        return this._consumed;
    }

    set consumed(consumed: boolean) {
        this._consumed = coerceBooleanProperty(consumed);
    }
    private _consumed = false;

    get material(): Material {
        return this._material;
    }

    set material(value: Material) {
        this._material = value;
    }
    private _material: Material;
}
