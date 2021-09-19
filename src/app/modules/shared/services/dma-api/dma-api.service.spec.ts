import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DmaApiService } from '@dma-shared';
import { NamedEntity } from '@dma-shared/models';

describe('DmaApiService', () => {
    let apiService: DmaApiService;

    let httpTestingControler: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingControler = TestBed.inject(HttpTestingController);

        apiService = TestBed.inject(DmaApiService);
    });

    it('should send a DELETE HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/value/string-1';

        apiService.deleteResource(url).subscribe();

        const request = httpTestingControler.expectOne(url);
        request.flush({});

        expect(request.request.method).toBe('DELETE');
    });

    it('should send a PUT HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity/named-entity-1';
        const expectedResponse = new NamedEntity('named-entity-1', 'My new named Entity name');

        apiService.putResource<NamedEntity>(url, expectedResponse, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingControler.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('PUT');
    });

    it('should send a POST HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse = { key: 'super simple value' };

        apiService.postResource(url, expectedResponse).subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingControler.expectOne(url);
        request.flush(expectedResponse);

        expect(request.request.method).toBe('POST');
    });

    it('should get a simple value from GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/constants/string-1';
        const expectedResponse = 'super simple string value';

        apiService.getResourse<string>(url, null).subscribe((response) => {
            expect(response).toBe(expectedResponse);
        });

        httpTestingControler.expectOne(url).flush('super simple string value');
    });

    it('should get a single typed entity from a GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity/named-entity-1';
        const expectedResponse = new NamedEntity('named-entity-1', 'My named Entity');

        apiService.getResourse<NamedEntity>(url, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        httpTestingControler.expectOne(url).flush({ id: 'named-entity-1', name: 'My named Entity' });
    });

    it('should get a list of typed entities from a GET HTTP call', () => {
        const url = 'https://server.dnd-mapp.nl.eu.org/named-entity';
        const expectedResponse = [
            new NamedEntity('named-entity-1', 'My named Entity'),
            new NamedEntity('named-entity-2', 'My other named Entity'),
        ];

        apiService.getResourse<NamedEntity[]>(url, 'NamedEntity').subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        httpTestingControler.expectOne(url).flush([
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
});
