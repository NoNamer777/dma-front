import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpellModel } from '@dma-shared';
import { DmaSpellDialogComponent } from '@dma-spells-overview/components/dma-spell-dialog/dma-spell-dialog.component';

@Component({
    selector: 'dma-spell-card',
    templateUrl: './dma-spell-card.component.html',
    styleUrls: ['./dma-spell-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSpellCardComponent {
    @Input()
    spell: SpellModel = null;

    constructor(private dialog: MatDialog) {}

    @HostListener(':click')
    public onClick(): void {
        this.dialog.open(DmaSpellDialogComponent, {
            hasBackdrop: true,
            data: this.spell,
            closeOnNavigation: true,
            autoFocus: false,
            panelClass: 'dma-dialog',
        });
    }
}
