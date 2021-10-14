import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaFaIconsModule } from '@dma-shared/dma-fa-icons.module';
import { Spell } from '@dma-shared/models';
import { MagicSchool, SpellComponent } from '@dma-shared/models/enums';
import { dispatchMouseEvent } from 'testing/fake-events';

import { DmaSpellDialogComponent } from './dma-spell-dialog.component';

describe('DmaSpellDialogComponent', () => {
    let fixture: ComponentFixture<DmaSpellDialogComponent>;
    let component: DmaSpellDialogComponent;
    let element: HTMLElement;

    const mockSpell = new Spell('spell-1');
    mockSpell.name = 'My Awesome Spell';
    mockSpell.castingTime = 'very long';
    mockSpell.duration = 'too short';
    mockSpell.range = 'always just out of range';
    mockSpell.concentration = true;
    mockSpell.ritual = true;
    mockSpell.level = 4;
    mockSpell.magicSchool = MagicSchool.CONJURATION;
    mockSpell.addComponent(SpellComponent.Vocal);

    class MatDialogRefMock {
        opened = true;

        close(): void {
            this.opened = false;
        }
    }

    const spellProvider = {
        provide: MAT_DIALOG_DATA,
        useValue: mockSpell,
    };

    const matDialogRefProvider = {
        provide: MatDialogRef,
        useClass: MatDialogRefMock,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmaFaIconsModule, MatDialogModule, NoopAnimationsModule],
            declarations: [DmaSpellDialogComponent],
            providers: [matDialogRefProvider, spellProvider],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DmaSpellDialogComponent);

        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should close the dialog when the close button is clicked', () => {
        spyOn(component, 'onCloseDialog').and.callThrough();

        const closeBtn = element.querySelector('button');

        dispatchMouseEvent(closeBtn, 'click');
        fixture.detectChanges();

        expect(component.onCloseDialog).toHaveBeenCalled();
    });
});
