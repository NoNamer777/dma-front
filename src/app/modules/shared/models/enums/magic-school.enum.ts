export enum MagicSchool {
    ABJURATION = 'Abjuration',
    CONJURATION = 'Conjuration',
    DIVINATION = 'Divination',
    ENCHANTMENT = 'Enchantment',
    EVOCATION = 'Evocation',
    ILLUSION = 'Illusion',
    NECROMANCY = 'Necromancy',
    TRANSMUTATION = 'Transmutation',
}

export interface MagicSchoolIndex {
    [school: string]: MagicSchool;
}

export function parseMagicSchool(value: string): MagicSchool {
    if (value === null || value === undefined || typeof value !== 'string') return null;

    for (const school in MagicSchool) {
        if (school === value.toUpperCase()) return (MagicSchool as MagicSchoolIndex)[school];
    }
    return null;
}
