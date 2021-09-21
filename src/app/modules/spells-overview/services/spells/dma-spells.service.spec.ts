import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Spell } from '@dma-shared/models';
import { DmaSpellsService } from './dma-spells.service';

describe('DmaSpellsService', () => {
    let spellsService: DmaSpellsService;

    let httpTestingController: HttpTestingController;

    const spellMock = new Spell('spell-1');
    spellMock.name = 'My Awesome Spell';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        spellsService = TestBed.inject(DmaSpellsService);
    });

    it('should return typed Spell objects', () => {
        spellsService.getSpells().subscribe(() => {
            expect(spellsService.spells).toEqual([spellMock]);
        });

        httpTestingController.expectOne('assets/data/spells.json').flush([
            {
                id: 'spell-1',
                name: 'My Awesome Spell',
            },
        ]);
    });
});
