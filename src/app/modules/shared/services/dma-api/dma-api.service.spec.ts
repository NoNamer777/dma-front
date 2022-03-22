import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@dma-environment/environment';
import { DmaApiService, NamedEntity, Pageable, Spell, SpellModel } from '@dma-shared';

describe('DmaApiService', () => {
    let apiService: DmaApiService;

    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        apiService = TestBed.inject(DmaApiService);
    });

    it('should send a DELETE HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/value/string-1';

        apiService.deleteResource(url).subscribe();

        const request = httpTestingController.expectOne(url);
        request.flush({});

        expect(request.request.method).toBe('DELETE');
    });

    it('should send a PUT HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity/named-entity-1';
        const expectedResponse: NamedEntity = { id: 'named-entity-1', name: 'My new named Entity name' };

        apiService.putResource<NamedEntity>(url, expectedResponse, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingController.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('PUT');
    });

    it('should send a POST HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse: NamedEntity = { id: null, name: 'super simple value' };

        apiService.postResource<NamedEntity>(url, expectedResponse, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingController.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('POST');
    });

    it('should send a GET HTTP call to a pageable resource', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse: Pageable<NamedEntity> = {
            content: [{ id: 'entity-id', name: 'entity-name' } as NamedEntity],
            pageable: {
                sort: {
                    sorted: false,
                    unsorted: true,
                    empty: false,
                },
                pageSize: 4,
                pageNumber: 1,
                offset: 0,
                paged: true,
                unpaged: false,
            },
            first: true,
            last: true,
            totalPages: 1,
            numberOfElements: 1,
            totalElements: 1,
            size: 1,
            sort: {
                sorted: false,
                unsorted: true,
                empty: false,
            },
        };

        apiService.getPageableResource<NamedEntity>(url, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
            expect(response.content.length).toBe(1);
            expect(response.content[0]).toEqual(expectedResponse.content[0]);
        });

        const request = httpTestingController.expectOne(url);
        request.flush({
            content: [
                {
                    id: 'entity-id',
                    name: 'entity-name',
                },
            ],
            pageable: {
                sort: {
                    sorted: false,
                    unsorted: true,
                    empty: false,
                },
                pageSize: 4,
                pageNumber: 1,
                offset: 0,
                paged: true,
                unpaged: false,
            },
            first: true,
            last: true,
            totalPages: 1,
            numberOfElements: 1,
            totalElements: 1,
            size: 1,
            sort: {
                sorted: false,
                unsorted: true,
                empty: false,
            },
        });

        expect(request.request.method).toBe('GET');
    });

    it('should get a simple value from GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/constants/string-1';
        const expectedResponse = 'super simple string value';

        apiService.getResource<string>(url, null).subscribe((response) => {
            expect(response).toBe(expectedResponse);
            expect(typeof response).toBe('string');
        });

        httpTestingController.expectOne(url).flush('super simple string value');
    });

    it('should get a single typed entity from a GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity/named-entity-1';

        apiService.getResource<NamedEntity>(url, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual({ id: 'named-entity-1', name: 'My named Entity' });
        });

        httpTestingController.expectOne(url).flush({ id: 'named-entity-1', name: 'My named Entity' });
    });

    it('should get a list of typed entities from a GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse = [
            { id: 'named-entity-1', name: 'My named Entity' },
            { id: 'named-entity-2', name: 'My other named Entity' },
        ];

        apiService.getResource<NamedEntity[]>(url, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        httpTestingController.expectOne(url).flush([
            {
                id: 'named-entity-1',
                name: 'My named Entity',
            },
            {
                id: 'named-entity-2',
                name: 'My other named Entity',
            },
        ]);
    });

    it('should fully type an object to an Entity', () => {
        const expectedSpell: Spell = new SpellModel({
            id: 'spell-2',
            name: 'Aid',
            level: 2,
            magicSchool: 'Abjuration',
            ritual: false,
            castingTime: '1 action',
            range: '30 feet',
            components: ['Vocal', 'Somatic', 'Material'],
            materials: [
                {
                    material: {
                        id: 'material-1',
                        description: 'a tiny strip of white cloth',
                    },
                    order: 0,
                    cost: 0.0,
                    consumed: false,
                },
            ],
            concentration: false,
            duration: '8 hours',
            descriptions: [
                {
                    id: 'description-3',
                    order: 0,
                    title: null,
                    text: "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit points maximum and current hit points increase by 5 for the duration.",
                },
                {
                    id: 'description-4',
                    order: 1,
                    title: 'At Higher Levels.',
                    text: "When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above the 2nd.",
                },
            ],
        });

        apiService.getResource<Spell>(`${environment.baseServerUrl}/api/spell/spell-2`, 'Spell').subscribe({
            next: (response) => expect(response).toEqual(expectedSpell),
        });

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell/spell-2`).flush({
            id: 'spell-2',
            name: 'Aid',
            level: 2,
            magicSchool: 'Abjuration',
            ritual: false,
            castingTime: '1 action',
            range: '30 feet',
            components: ['Vocal', 'Somatic', 'Material'],
            materials: [
                {
                    material: {
                        id: 'material-1',
                        description: 'a tiny strip of white cloth',
                    },
                    cost: 0.0,
                    order: 0,
                    consumed: false,
                },
            ],
            concentration: false,
            duration: '8 hours',
            descriptions: [
                {
                    id: 'description-3',
                    order: 0,
                    title: null,
                    text: `Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit points maximum and current hit points increase by 5 for the duration.`,
                },
                {
                    id: 'description-4',
                    order: 1,
                    title: 'At Higher Levels.',
                    text: `When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above the 2nd.`,
                },
            ],
        });
    });
});
