import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DmaApiService } from '@dma-shared';
import { Description, Material, NamedEntity, Pageable, Spell, SpellMaterial } from '@dma-shared/models';
import { environment } from '../../../../../environments/environment';
import { MagicSchool, SpellComponent } from '@dma-shared/models/enums';

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
        const expectedResponse = new NamedEntity('named-entity-1', 'My new named Entity name');

        apiService.putResource<NamedEntity>(url, expectedResponse, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
            expect(response).toBeInstanceOf(NamedEntity);
        });

        const request = httpTestingController.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('PUT');
    });

    it('should send a POST HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse = new NamedEntity(null, 'super simple value');

        apiService.postResource<NamedEntity>(url, expectedResponse, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
            expect(response).toBeInstanceOf(NamedEntity);
        });

        const request = httpTestingController.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('POST');
    });

    it('should send a GET HTTP call to a pageable resource', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse: Pageable<NamedEntity> = {
            content: [new NamedEntity('entity-id', 'entity-name')],
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
            expect(response.content[0]).toBeInstanceOf(NamedEntity);
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
            expect(response).toEqual(new NamedEntity('named-entity-1', 'My named Entity'));
        });

        httpTestingController.expectOne(url).flush({ id: 'named-entity-1', name: 'My named Entity' });
    });

    it('should get a list of typed entities from a GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse = [
            new NamedEntity('named-entity-1', 'My named Entity'),
            new NamedEntity('named-entity-2', 'My other named Entity'),
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
        const spellComponent = new Material('material-1');
        spellComponent.description = 'a tiny strip of white cloth';

        const spellMaterial = new SpellMaterial();
        spellMaterial.material = spellComponent;
        spellMaterial.consumed = false;
        spellMaterial.cost = 0.0;
        spellMaterial.order = 0;

        const description1 = new Description('description-3');
        description1.order = 0;
        description1.text = `Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit points maximum and current hit points increase by 5 for the duration.`;

        const description2 = new Description('description-4');
        description2.order = 1;
        description2.title = 'At Higher Levels.';
        description2.text = `When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above the 2nd.`;

        const expectedSpell = new Spell('spell-2');
        expectedSpell.name = 'Aid';
        expectedSpell.level = 2;
        expectedSpell.magicSchool = MagicSchool.ABJURATION;
        expectedSpell.ritual = false;
        expectedSpell.castingTime = '1 action';
        expectedSpell.range = '30 feet';
        expectedSpell.addComponent(SpellComponent.Vocal);
        expectedSpell.addComponent(SpellComponent.Somatic);
        expectedSpell.addComponent(SpellComponent.Material);
        expectedSpell.addMaterial(spellMaterial);
        expectedSpell.concentration = false;
        expectedSpell.duration = '8 hours';
        expectedSpell.addDescription(description1);
        expectedSpell.addDescription(description2);

        apiService.getResource<Spell>(`${environment.baseServerUrl}/api/spell/spell-2`, 'Spell').subscribe({
            next: (response) => {
                expect(response).toEqual(expectedSpell);
            },
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
                    consumedBySpell: false,
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
