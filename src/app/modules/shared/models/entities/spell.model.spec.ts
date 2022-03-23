import { Description, Spell, SpellModel } from '@dma-shared';

describe('SpellModel', () => {
    function expectFormattedSchoolAndLevelForSpell(spell: SpellModel, formattedLevel: string, isCantrip = false): void {
        expect(spell.formattedLevel).toEqual(formattedLevel);

        expect(spell.formattedSpellSchoolAndLevel).toEqual(
            isCantrip ? `${spell.magicSchool} ${formattedLevel}` : `${formattedLevel} ${spell.magicSchool}`,
        );
    }

    it('should add a Spell Component', () => {
        const spell = new SpellModel();

        expect(spell.addComponent('Somatic')).toBeTrue();
    });

    it('should not add a Spell Component if its already a required Spell Component', () => {
        const spell = new SpellModel({
            components: ['Vocal'],
        } as Spell);

        expect(spell.addComponent('Vocal')).toBeFalse();
    });

    it('should not remove a Spell Component if it is not a required Spell Component', () => {
        const spell = new SpellModel({
            components: ['Vocal'],
        } as Spell);

        expect(spell.removeComponent('Material')).toBeFalse();
    });

    it('should remove a Spell Component', () => {
        const spell = new SpellModel({
            components: ['Vocal'],
        } as Spell);

        expect(spell.removeComponent('Vocal')).toBeTrue();
    });

    it('should clear Spell Components and Materials if all Spell Components are removed', () => {
        const spell = new SpellModel({
            components: ['Vocal', 'Somatic', 'Material'],
            materials: [
                {
                    material: {
                        id: 'material-2',
                        description: 'Fake material 1',
                    },
                    order: 0,
                    cost: 0.0,
                    consumed: false,
                },
            ],
        } as Spell);

        expect(spell.components).toEqual(['Vocal', 'Somatic', 'Material']);
        expect(spell.requiresMaterials).toBeTrue();

        spell.clearComponents();

        expect(spell.components).toEqual([]);
        expect(spell.materials).toEqual([]);
    });

    it('should clear the materials if Material Spell Component is removed', () => {
        const spell = new SpellModel({
            components: ['Vocal', 'Somatic', 'Material'],
            materials: [
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
                {
                    material: {
                        id: 'material-1',
                        description: 'a tiny strip of white cloth',
                    },
                    order: 2,
                    cost: 0.0,
                    consumed: false,
                },
            ],
        } as Spell);

        expect(spell.components).toEqual(['Vocal', 'Somatic', 'Material']);
        expect(spell.requiresMaterials).toBeTrue();
        expect(spell.materials).toEqual([
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
            {
                material: {
                    id: 'material-1',
                    description: 'a tiny strip of white cloth',
                },
                order: 2,
                cost: 0.0,
                consumed: false,
            },
        ]);

        spell.removeComponent('Material');

        expect(spell.components).toEqual(['Vocal', 'Somatic']);
        expect(spell.requiresMaterials).toBeFalse();
        expect(spell.materials).toEqual([]);
    });

    it('should not be able to add a material if the does not require Material components', () => {
        const spell = new SpellModel();

        expect(
            spell.addMaterial({
                order: 0,
                cost: 0.0,
                consumed: false,
                material: {
                    id: '1',
                    description: 'Fake material description',
                },
            }),
        ).toBeFalse();
    });

    it('should not remove a Material if no Material components are required', () => {
        const spell = new SpellModel();

        expect(
            spell.removeMaterial({
                order: 0,
                cost: 0.0,
                consumed: false,
                material: {
                    id: '1',
                    description: 'Fake material description',
                },
            }),
        ).toBeFalse();
    });

    it('should not remove a Material if it is not a required Material', () => {
        const spell = new SpellModel({
            components: ['Material'],
            materials: [
                {
                    order: 0,
                    cost: 0.0,
                    consumed: false,
                    material: {
                        id: '2',
                        description: 'Fake material description 2',
                    },
                },
            ],
        } as Spell);

        expect(
            spell.removeMaterial({
                order: 0,
                cost: 0.0,
                consumed: false,
                material: {
                    id: '1',
                    description: 'Fake material description',
                },
            }),
        ).toBeFalse();
    });

    it('should remove a Material', () => {
        const spell = new SpellModel({
            components: ['Material'],
            materials: [
                {
                    order: 0,
                    cost: 0.0,
                    consumed: false,
                    material: {
                        id: '1',
                        description: 'Fake material description',
                    },
                },
            ],
        } as Spell);

        expect(
            spell.removeMaterial({
                order: 0,
                cost: 0.0,
                consumed: false,
                material: {
                    id: '1',
                    description: 'Fake material description',
                },
            }),
        ).toBeTrue();
    });

    it('should not add a material that is already required', () => {
        const material = {
            material: {
                id: 'material-1',
                description: 'a tiny strip of white cloth',
            },
            order: 2,
            cost: 0.0,
            consumed: false,
        };

        const spell = new SpellModel({
            components: ['Material'],
            materials: [material],
        } as Spell);

        expect(spell.requiresMaterial(material)).toBeTrue();
        expect(spell.addMaterial(material)).toBeFalse();
    });

    it('should not add a Description if it has no ID', () => {
        const spell = new SpellModel();

        expect(
            spell.addDescription({
                order: 0,
                title: null,
                text: 'Fake Description',
            } as Description),
        ).toBeFalse();
    });

    it('should not add a Description if it has is already part of the Spell', () => {
        const spell = new SpellModel({
            descriptions: [
                {
                    id: '1',
                    order: 0,
                    title: null,
                    text: 'Fake Description',
                },
            ],
        } as Spell);

        expect(
            spell.addDescription({
                id: '1',
            } as Description),
        ).toBeFalse();
    });

    it('should add a Description', () => {
        const spell = new SpellModel();

        expect(
            spell.addDescription({
                id: '1',
                order: 0,
            } as Description),
        ).toBeTrue();
    });

    it('should not remove a Description if the provided Description does not have an ID', () => {
        const spell = new SpellModel();

        expect(spell.removeDescription({} as Description)).toBeFalse();
    });

    it('should not remove a Description if it is not part of the Spell', () => {
        const spell = new SpellModel();

        expect(spell.removeDescription({ id: '1' } as Description)).toBeFalse();
    });

    it('should remove a Description', () => {
        const spell = new SpellModel({
            descriptions: [
                {
                    id: '1',
                    order: 0,
                    title: null,
                    text: 'Fake Description',
                },
            ],
        } as Spell);

        expect(spell.removeDescription({ id: '1' } as Description)).toBeTrue();
    });

    it('should remove all Descriptions', () => {
        const spell = new SpellModel({
            descriptions: [
                {
                    id: '1',
                    order: 0,
                    title: null,
                    text: 'Fake Description 1',
                },
                {
                    id: '2',
                    order: 1,
                    title: null,
                    text: 'Fake Description 2',
                },
                {
                    id: '2',
                    order: 2,
                    title: null,
                    text: 'Fake Description 3',
                },
            ],
        } as Spell);

        spell.clearDescriptions();

        expect(spell.descriptions).toEqual([]);
    });

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

    it('should format values to be displayed', () => {
        let spell = new SpellModel({
            level: 0,
            magicSchool: 'Abjuration',
            components: ['Vocal', 'Somatic', 'Material'],
            materials: [
                {
                    order: 0,
                    material: {
                        id: '1',
                        description: 'Fake material 1',
                    },
                },
                {
                    order: 1,
                    material: {
                        id: '2',
                        description: 'Fake material 2',
                    },
                },
                {
                    order: 2,
                    material: {
                        id: '3',
                        description: 'a tiny strip of white cloth',
                    },
                },
            ],
        } as Spell);

        expect(spell.formattedComponents).toEqual('V, S, M');
        expect(spell.formattedMaterials).toEqual('Fake material 1, Fake material 2, and a tiny strip of white cloth.');
        expectFormattedSchoolAndLevelForSpell(spell, 'Cantrip', spell.isCantrip);

        spell = new SpellModel({
            level: 1,
            magicSchool: 'Abjuration',
        } as Spell);

        expectFormattedSchoolAndLevelForSpell(spell, '1st-level');

        spell = new SpellModel({
            level: 2,
            magicSchool: 'Abjuration',
        } as Spell);

        expectFormattedSchoolAndLevelForSpell(spell, '2nd-level');

        spell = new SpellModel({
            level: 3,
            magicSchool: 'Abjuration',
        } as Spell);

        expectFormattedSchoolAndLevelForSpell(spell, '3rd-level');

        spell = new SpellModel({
            level: 5,
            magicSchool: 'Abjuration',
        } as Spell);

        expectFormattedSchoolAndLevelForSpell(spell, '5th-level');
    });
});
