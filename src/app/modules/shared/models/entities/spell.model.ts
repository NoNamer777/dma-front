import { Description, MagicSchool, Spell, SpellComponent, SpellMaterial } from '@dma-shared';

export class SpellModel implements Spell {
    id: string = null;
    name: string;
    level = 0;
    magicSchool: MagicSchool;
    ritual = false;
    castingTime: string;
    range: string;
    concentration = false;
    duration: string;
    components: SpellComponent[] = [];
    materials: SpellMaterial[] = [];
    descriptions: Description[] = [];

    constructor(properties = {} as Spell) {
        this.id = properties.id;
        this.name = properties.name;
        this.level = properties.level ?? 0;
        this.magicSchool = properties.magicSchool;
        this.ritual = properties.ritual ?? false;
        this.castingTime = properties.castingTime;
        this.range = properties.range;
        this.concentration = properties.concentration ?? false;
        this.duration = properties.duration;

        this.components = properties.components ?? [];
        this.addAllMaterials(properties.materials ?? []);
        this.addAllDescriptions(properties.descriptions ?? []);
    }

    get isCantrip(): boolean {
        return this.level === 0;
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

    get requiresMaterials(): boolean {
        return this.components.includes('Material');
    }

    requiresComponent(component: SpellComponent): boolean {
        return this.components.includes(component);
    }

    addComponent(component: SpellComponent): boolean {
        if (this.requiresComponent(component)) return false;

        this.components.push(component);

        return true;
    }

    removeComponent(component: SpellComponent): boolean {
        if (!this.requiresComponent(component)) return false;

        this.components.splice(this.components.indexOf(component), 1);

        if (component === 'Material') {
            this.clearMaterials();
        }
        return true;
    }

    clearComponents(): void {
        if (this.requiresComponent('Material')) {
            this.clearMaterials();
        }
        this.components = [];
    }

    requiresMaterial(material: SpellMaterial): boolean {
        return this.materials.some((listedMaterial) => listedMaterial.material.id === material.material.id);
    }

    addAllMaterials(materials: SpellMaterial[]): void {
        materials.forEach((material) => this.addMaterial(material));
    }

    addMaterial(material: SpellMaterial): boolean {
        if (!this.requiresMaterials) return false;
        if (this.requiresMaterial(material)) return false;

        this.materials.push(material);
        this.materials = this.materials.sort((m1, m2) => m1.order - m2.order);

        return true;
    }

    removeMaterial(material: SpellMaterial): boolean {
        if (!this.requiresMaterials) return false;
        if (!this.requiresMaterial(material)) return false;

        this.materials.splice(this.materials.indexOf(material), 1);

        return true;
    }

    clearMaterials(): void {
        this.materials = [];
    }

    hasDescription(id: string): boolean {
        return this.descriptions.some((description) => description.id === id);
    }

    addAllDescriptions(descriptions: Description[]): void {
        descriptions.forEach((description) => this.addDescription(description));
    }

    addDescription(description: Description): boolean {
        if (!description.id || this.hasDescription(description.id)) return false;

        this.descriptions.push(description);
        this.descriptions = this.descriptions.sort((d1, d2) => d1.order - d2.order);

        return true;
    }

    removeDescription(description: Description): boolean {
        if (!description.id || !this.hasDescription(description.id)) return false;

        const foundDescription = this.descriptions.find((listedDescription) => description.id === listedDescription.id);

        this.descriptions.splice(this.descriptions.indexOf(foundDescription), 1);

        return true;
    }

    clearDescriptions(): void {
        this.descriptions = [];
    }
}
