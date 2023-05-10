import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { coerceStringProperty, extractQueryParam, findParentElement } from '@dma-shared';

interface PreparedDocument {
    container: HTMLDivElement;
    paragraph: HTMLParagraphElement;
}

function queryParamsProvider(queryParamMap: Record<string, unknown>) {
    return {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                queryParamMap: convertToParamMap(queryParamMap),
            },
        },
    };
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

    describe('String coercion', () => {
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

    describe('Parent element finding', () => {
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

    describe('Query param extractor', () => {
        it('should extract requested query params', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                providers: [
                    queryParamsProvider({
                        'string': 'hello there',
                        'number': 9001,
                        'boolean': 'false',
                        'other-boolean': 'true',
                    }),
                ],
            });

            const route = TestBed.inject(ActivatedRoute);

            expect(extractQueryParam(route.snapshot, 'string', 'string')).toBe('hello there');
            expect(extractQueryParam<number>(route.snapshot, 'number', 'number')).toBe(9001);
            expect(extractQueryParam<boolean>(route.snapshot, 'boolean', 'boolean')).toBe(false);
            expect(extractQueryParam<boolean>(route.snapshot, 'other-boolean', 'boolean')).toBe(true);
        });

        it('should throw exceptions when mismatched found value type with expected value type', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                providers: [
                    queryParamsProvider({
                        string: 'hello there',
                        boolean: 'false',
                        number: 9001,
                    }),
                ],
            });

            const route = TestBed.inject(ActivatedRoute);

            expect(() => extractQueryParam(route.snapshot, 'string', 'number')).toThrowError();
            expect(() => extractQueryParam(route.snapshot, 'string', 'boolean')).toThrowError();
            expect(() => extractQueryParam(route.snapshot, 'number', 'boolean')).toThrowError();
            expect(() => extractQueryParam(route.snapshot, 'boolean', 'number')).toThrowError();
        });
    });
});
