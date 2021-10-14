import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NamedEntity } from '../named-entity.model';

export class MaterialComponent extends NamedEntity {

    get cost(): number {
        return this._cost;
    }
    set cost(value: number) {
        this._cost = coerceNumberProperty(value, 0.0);
    }
    private _cost = 0.0;

    get consumedBySpell(): boolean {
        return this._consumedBySpell;
    }
    set consumedBySpell(value: boolean) {
        this._consumedBySpell = coerceBooleanProperty(value);
    }
    private _consumedBySpell = false;
}
