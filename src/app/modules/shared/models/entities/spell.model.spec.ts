import { Description, Spell, SpellModel } from '@dma-shared';

describe('SpellModel', () => {
    it('should sort the Spell descriptions on creation by order', () => {
        const spell = new SpellModel({
            descriptions: [
                {
                    id: 'description-4',
                    order: 1,
                    title: 'At Higher Levels.',
                    text: "When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above the 2nd.",
                },
                {
                    id: 'description-3',
                    order: 0,
                    title: null,
                    text: "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit points maximum and current hit points increase by 5 for the duration.",
                },
                {
                    id: 'description-5',
                    order: 2,
                    title: null,
                    text: 'Fake description',
                },
            ],
        } as Spell);

        for (const description of spell.descriptions) {
            const idx = spell.descriptions.indexOf(description);

            expect(description.order).toEqual(idx);
        }
    });

    it('should sort the Spell materials on creation by order', () => {
        const spell = new SpellModel({
            components: ['Material'],
            materials: [
                {
                    material: {
                        id: 'material-1',
                        description: 'a tiny strip of white cloth',
                    },
                    order: 2,
                    cost: 0.0,
                    consumed: false,
                },
                {
                    material: {
                        id: 'material-2',
                        description: 'Fake material 1',
                    },
                    order: 0,
                    cost: 0.0,
                    consumed: false,
                },
                {
                    material: {
                        id: 'material-3',
                        description: 'Fake material 2',
                    },
                    order: 1,
                    cost: 0.0,
                    consumed: false,
                },
            ],
        } as Spell);

        for (const material of spell.materials) {
            const idx = spell.materials.indexOf(material);

            expect(material.order).toEqual(idx);
        }
    });
});
