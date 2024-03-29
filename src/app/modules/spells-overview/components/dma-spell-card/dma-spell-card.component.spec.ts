import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaFaIconsModule, Spell, SpellModel } from '@dma-shared';
import { dispatchMouseEvent } from '@dma-testing';
import { DmaSpellDialogComponent } from '../dma-spell-dialog/dma-spell-dialog.component';
import { DmaSpellCardComponent } from './dma-spell-card.component';

describe('DmaSpellCardComponent', () => {
    let fixture: ComponentFixture<DmaSpellCardMockComponent>;

    let element: HTMLElement;

    const mockSpell = new SpellModel({
        id: 'spell-1',
        name: 'My Awesome Spell',
        magicSchool: 'Conjuration',
        castingTime: 'very long',
        duration: 'too short',
        range: 'always just out of range',
        concentration: true,
        ritual: true,
        level: 4,
        components: ['Vocal'],
    } as Spell);

    @Component({
        selector: 'dma-spell-card-mock',
        template: `
            <div class="pt-5">
                <dma-spell-card [spell]="spell"></dma-spell-card>
            </div>
        `,
    })
    class DmaSpellCardMockComponent {
        spell = mockSpell;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmaFaIconsModule, MatDialogModule, NoopAnimationsModule],
            declarations: [DmaSpellCardMockComponent, DmaSpellCardComponent, DmaSpellDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DmaSpellCardMockComponent);

        fixture.detectChanges();

        element = fixture.debugElement.query(By.directive(DmaSpellCardComponent)).nativeElement;
    });

    afterEach(inject([OverlayContainer], async (oc: OverlayContainer) => {
        // The overlay container's `ngOnDestroy` won't be called between test runs so we need
        // to call it ourselves, in order to avoid leaking containers between tests and potentially
        // throwing `querySelector` calls.
        oc.ngOnDestroy();
    }));

    it('should render the spell info on the card', () => {
        expect(element.querySelector('h5.card-title').textContent).toBe(mockSpell.name);
        expect(element.querySelector('h6.card-subtitle.text-muted').textContent).toBe('4th-level Conjuration');
    });

    it('should open a dialog with all spell detials on card click', () => {
        dispatchMouseEvent(element, 'click');
        fixture.detectChanges();

        expect(document.documentElement.querySelector('dma-spell-dialog')).not.toBe(null);
    });

    it('should not open a dialog when clicking outside the card', () => {
        dispatchMouseEvent(document.documentElement, 'click');
        fixture.detectChanges();

        expect(document.documentElement.querySelector('dma-spell-dialog')).toBe(null);
    });
});
