import { coerceStringProperty } from '@dma-shared';

describe('Common Functions', () => {
    it('should coerce string values', () => {
        expect(coerceStringProperty(true)).toBe('true');
        expect(coerceStringProperty(false)).toBe('false');
        expect(coerceStringProperty({ key: 1 })).toBe('{"key":1}');
        expect(coerceStringProperty('string value')).toBe('string value');
        expect(coerceStringProperty(1234)).toBe('1234');
        expect(coerceStringProperty([9876, 'string', { key: true }])).toBe('[9876,"string",{"key":true}]');
    });

    it('should not coerce `null` or `undefined` values to strings', () => {
        expect(coerceStringProperty(null)).toBe(null);
        expect(coerceStringProperty(undefined)).toBe(undefined);
    });
});
