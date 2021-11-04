import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../../environments/environment';
import { DmaSpellsService } from './dma-spells.service';
import { Pageable } from '@dma-shared/models/pageable.model';
import { Spell } from '@dma-shared/models';

describe('DmaSpellsService', () => {
    let spellsService: DmaSpellsService;

    let httpTestingController: HttpTestingController;

    const spellMock = new Spell('spell-1');
    spellMock.name = 'My Awesome Spell';
    const spellPageMock = {
        content: [spellMock],
    } as Pageable<Spell>;

    afterEach(() => httpTestingController.verify());

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        spellsService = TestBed.inject(DmaSpellsService);
    });

    it('should return typed Spell objects', () => {
        spellsService.getSpells().subscribe({
            next: () => expect(spellsService.spellsPage).toEqual(spellPageMock),
        });

        httpTestingController.expectOne(`${environment.baseUrl}/api/spell`).flush({
            content: [
                {
                    id: 'spell-1',
                    name: 'My Awesome Spell',
                },
            ],
        });
    });

    it('should return a specific page of Spells', () => {
        spellsService.getSpells({ page: 2 }).subscribe({
            next: (spellsPage) => expect(spellsPage.pageable.pageNumber).toBe(2),
        });

        httpTestingController.expectOne(`${environment.baseUrl}/api/spell?page=2`).flush({
            content: [],
            pageable: {
                pageNumber: 2,
            },
        });
    });

    it('should not add request parameters when their value is null', () => {
        spellsService.getSpells({ page: null }).subscribe();

        const request = httpTestingController.expectOne(`${environment.baseUrl}/api/spell`);
        request.flush({ content: [] });

        expect(request.request.url).toBe(`${environment.baseUrl}/api/spell`);
    });

    it('should add request parameters when their value is not null', () => {
        spellsService.getSpells({ page: 1, name: 'awesome spell' }).subscribe();

        const request = httpTestingController.expectOne(`${environment.baseUrl}/api/spell?page=1&name=awesome spell`);
        request.flush({ content: [] });

        expect(request.request.url).toBe(`${environment.baseUrl}/api/spell?page=1&name=awesome spell`);
    });
});
