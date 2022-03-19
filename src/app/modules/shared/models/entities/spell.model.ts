import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { MagicSchool, SpellComponent } from '../enums';
import { NamedEntity } from '../named-entity.model';
import { Description } from './description.model';
import { SpellMaterial } from './spell-material.model';

export class Spell extends NamedEntity {
    public get level(): number {
        return coerceNumberProperty(this._level);
    }
    public set level(value: number) {
        this._level = coerceNumberProperty(value, 0);
    }
    private _level = 0;

    public get magicSchool(): MagicSchool {
        return this._magicSchool;
    }
    public set magicSchool(value: MagicSchool) {
        this._magicSchool = value;
    }
    private _magicSchool: MagicSchool;

    public get ritual(): boolean {
        return this._ritual;
    }
    public set ritual(ritual: boolean) {
        this._ritual = coerceBooleanProperty(ritual);
    }
    private _ritual = false;

    public get castingTime(): string {
        return this._castingTime;
    }
    public set castingTime(castingTime: string) {
        this._castingTime = castingTime;
    }
    private _castingTime: string;

    public get range(): string {
        return this._range;
    }
    public set range(range: string) {
        this._range = range;
    }
    private _range: string;

    get components(): SpellComponent[] {
        return this._components;
    }
    private _components: SpellComponent[] = [];

    get materials(): SpellMaterial[] {
        return this._materials;
    }
    private _materials: SpellMaterial[] = [];

    public get concentration(): boolean {
        return this._concentration;
    }
    public set concentration(concentration: boolean) {
        this._concentration = coerceBooleanProperty(concentration);
    }
    private _concentration = false;

    public get duration(): string {
        return this._duration;
    }
    public set duration(duration: string) {
        this._duration = duration;
    }
    private _duration: string;

    get descriptions(): Description[] {
        return this._descriptions;
    }
    private _descriptions: Description[] = [];

    constructor(id?: string) {
        super(id);
    }

    get requiresMaterials(): boolean {
        return this.components.includes(SpellComponent.Material);
    }

    get formattedSpellSchoolAndLevel(): string {
        return this.level === 0
            ? `${this.magicSchool} ${this.formattedLevel}`
            : `${this.formattedLevel} ${this.magicSchool}`;
    }

    get formattedLevel(): string {
        switch (this.level) {
            case 0:
                return 'Cantrip';
            case 1:
                return '1st-level';
            case 2:
                return '2nd-level';
            case 3:
                return '3rd-level';
            default:
                return `${this.level}th-level`;
        }
    }

    get formattedComponents(): string {
        let value = '';

        for (const component of this.components) {
            value += `${component.charAt(0)}, `;
        }

        return value.substring(0, value.length - 2);
    }

    get formattedMaterials(): string {
        this.materials.sort((m1, m2) => m1.order - m2.order);
        let value = '';

        for (let idx = 0; idx < this.materials.length; idx++) {
            const spellMaterial = this.materials[idx];

            if (idx == this.materials.length - 1 && this.materials.length > 1) {
                value += 'and ';
            }
            value += `${spellMaterial.material.description}, `;
        }
        return value.charAt(0).toUpperCase() + value.substring(1, value.length - 2) + '.';
    }

    requiresComponent(component: SpellComponent): boolean {
        return this.components.includes(component);
    }

    addComponent(component: SpellComponent): boolean {
        if (this.requiresComponent(component)) return false;

        this.components.push(component);

        if (component === SpellComponent.Material) {
            this._materials = [];
        }

        return true;
    }

    removeComponent(component: SpellComponent): boolean {
        if (!this.requiresComponent(component)) return false;

        this.components.splice(this.components.indexOf(component), 1);

        if (component === SpellComponent.Material) {
            this.clearMaterials();
        }
        return true;
    }

    clearComponents(): void {
        if (this.requiresComponent(SpellComponent.Material)) {
            this.clearMaterials();
        }
        this._components = [];
    }

    requiresMaterial(material: SpellMaterial): boolean {
        return this.materials.includes(material);
    }

    addMaterial(material: SpellMaterial): boolean {
        if (!this.requiresMaterials) return false;
        if (this.requiresMaterial(material)) return false;

        this.materials.push(material);

        return true;
    }

    removeMaterial(material: SpellMaterial): boolean {
        if (!this.requiresMaterials) return false;
        if (!this.requiresMaterial(material)) return false;

        this.materials.splice(this.materials.indexOf(material), 1);

        return true;
    }

    clearMaterials(): void {
        this._materials = [];
    }

    hasDescription(id: string): boolean {
        return !!this.descriptions.find((description) => description.id === id);
    }

    addDescription(description: Description): boolean {
        if (description.id !== null && this.hasDescription(description.id)) return false;

        this.descriptions.push(description);

        return true;
    }

    removeDescription(description: Description): boolean {
        if (!this.hasDescription(description.id)) return false;

        this.descriptions.splice(this.descriptions.indexOf(description), 1);

        return true;
    }

    clearDescriptions(): void {
        this._descriptions = [];
    }
}
