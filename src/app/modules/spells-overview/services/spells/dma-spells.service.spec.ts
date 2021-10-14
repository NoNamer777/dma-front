import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Spell } from '@dma-shared/models';
import { DmaSpellsService } from './dma-spells.service';
import { environment } from '../../../../../environments/environment';
import { Pageable } from '@dma-shared/models/pageable.model';

describe('DmaSpellsService', () => {
    let spellsService: DmaSpellsService;

    let httpTestingController: HttpTestingController;

    const spellMock = new Spell('spell-1');
    spellMock.name = 'My Awesome Spell';
    const spellPageMock = {
        content: [
            spellMock,
        ],
    } as Pageable<Spell>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        spellsService = TestBed.inject(DmaSpellsService);
    });

    it('should return typed Spell objects', () => {
        spellsService.getSpells().subscribe(() => {
            expect(spellsService.spellsPage).toEqual(spellPageMock);
        });

        httpTestingController.expectOne(`${environment.baseApiUrl}/spell`).flush({
            content: [
                {
                    id: 'spell-1',
                    name: 'My Awesome Spell',
                },
            ],
        });
    });
});
