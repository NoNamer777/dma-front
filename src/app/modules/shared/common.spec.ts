import { coerceStringProperty, findParentElement } from '@dma-shared';

interface PreparedDocument {
    container: HTMLDivElement;
    paragraph: HTMLParagraphElement;
}

describe('Common Functions', () => {
    function prepareDocument(): PreparedDocument {
        const container = document.createElement('div');
        const paragraph = document.createElement('p');

        paragraph.textContent = 'Hello World!';
        container.id = 'paragraph-container';

        container.appendChild(paragraph);
        document.documentElement.appendChild(container);

        return {
            container,
            paragraph,
        };
    }

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

    it('should find a parent element', () => {
        const { paragraph, container } = prepareDocument();

        expect(findParentElement(paragraph, ['div']).id).toBe('paragraph-container');

        document.documentElement.removeChild(container);
    });

    it('should return the same element if target has the same tags', () => {
        const { container } = prepareDocument();

        expect(findParentElement(container, ['div']).id).toBe('paragraph-container');

        document.documentElement.removeChild(container);
    });

    it('should return `null` if no element of the provided tags could be found', () => {
        const { container } = prepareDocument();

        expect(findParentElement(container, ['button', 'nav', 'main'])).toBe(null);

        document.documentElement.removeChild(container);
    });
});
