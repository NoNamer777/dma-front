import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpellModel } from '@dma-shared';

@Component({
    selector: 'dma-spell-dialog',
    templateUrl: './dma-spell-dialog.component.html',
    styleUrls: ['./dma-spell-dialog.component.scss'],
})
export class DmaSpellDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<DmaSpellDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public spell: SpellModel,
    ) {}

    onCloseDialog(): void {
        this.dialogRef.close();
    }
}
