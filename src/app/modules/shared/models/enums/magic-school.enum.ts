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
