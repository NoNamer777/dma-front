import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaFaIconsModule, Spell, SpellModel } from '@dma-shared';
import { dispatchMouseEvent } from '@dma-testing';
import { DmaSpellDialogComponent } from './dma-spell-dialog.component';

describe('DmaSpellDialogComponent', () => {
    let fixture: ComponentFixture<DmaSpellDialogComponent>;
    let component: DmaSpellDialogComponent;
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
