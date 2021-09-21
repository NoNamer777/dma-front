import { NgModule } from '@angular/core';
import { DmaSharedModule } from '@dma-shared';

import { DmaSpellCardComponent } from './components/dma-spell-card/dma-spell-card.component';
import { DmaSpellDialogComponent } from './components/dma-spell-dialog/dma-spell-dialog.component';

@NgModule({
    imports: [DmaSharedModule],
    declarations: [DmaSpellCardComponent, DmaSpellDialogComponent],
})
export class DmaSpellsOverviewModule {}
