import { MagicSchool, SpellComponent } from '@dma-shared/models/dma-enums';
import { Entity } from '@dma-shared/models/dma-server-base-models';

export interface Description extends Entity {
    order: number;
    title: string;
    text: string;
}

export interface Material extends Entity {
    description: string;
}

export interface SpellMaterial {
    order: number;
    cost: number;
    consumed: boolean;
    material: Material;
}

export interface Spell {
    id: string;
    name: string;
    level: number;
    magicSchool: MagicSchool;
    ritual: boolean;
    castingTime: string;
    range: string;
    concentration: boolean;
    duration: string;
    components: SpellComponent[];
    materials: SpellMaterial[];
    descriptions: Description[];
}
