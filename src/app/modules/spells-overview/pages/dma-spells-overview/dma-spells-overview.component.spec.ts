import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../../../../environments/environment';
import { DmaSpellsOverviewComponent } from './dma-spells-overview.component';
import { DmaSpellCardComponent } from '@dma-spells-overview/components/dma-spell-card/dma-spell-card.component';
import { Spell } from '@dma-shared/models';

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
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(DmaSpellsOverviewComponent);

        element = fixture.nativeElement;

        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseApiUrl}/spell`).flush({
            content: [mockSpell1, mockSpell2],
        });

        fixture.detectChanges();
    });

    it('should show received Spells as cards in the overview template', () => {
        const spellCards = element.querySelectorAll('dma-spell-card');

        expect(spellCards.length).toBe(2);
    });
});
