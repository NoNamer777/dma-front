export enum SpellComponent {
    Vocal = 'Vocal',
    Somatic = 'Somatic',
    Material = 'Material',
}

export interface SpellComponentIndex {
    [component: string]: SpellComponent;
}
