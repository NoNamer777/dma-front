import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spell } from '@dma-shared/models';
import { DmaSpellCardComponent } from '@dma-spells-overview/components/dma-spell-card/dma-spell-card.component';

import { DmaSpellsOverviewComponent } from './dma-spells-overview.component';

describe('DmaSpellsOverviewComponent', () => {
    let fixture: ComponentFixture<DmaSpellsOverviewComponent>;
    let httpTestingController: HttpTestingController;
    let element: HTMLElement;

    const mockSpell1 = new Spell('spell-1');
    mockSpell1.name = 'My Awesome Spell 1';

    const mockSpell2 = new Spell('spell-2');
    mockSpell2.name = 'My Awesome Spell 2';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule, NoopAnimationsModule],
            declarations: [DmaSpellsOverviewComponent, DmaSpellCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DmaSpellsOverviewComponent);
        httpTestingController = TestBed.inject(HttpTestingController);

        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should show received Spells as cards in the overview template', () => {
        httpTestingController.expectOne('assets/data/spells.json').flush([mockSpell1, mockSpell2]);

        fixture.detectChanges();

        const spellCards = element.querySelectorAll('dma-spell-card');

        expect(spellCards.length).toBe(2);
    });
});
