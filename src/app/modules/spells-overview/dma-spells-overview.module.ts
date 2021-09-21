import { NgModule } from '@angular/core';
import { DmaSharedModule } from '@dma-shared';

import { DmaSpellsOverviewRoutingModule } from './dma-spells-overview-routing.module';
import { DmaSpellsOverviewComponent } from './pages/dma-spells-overview/dma-spells-overview.component';
import { DmaSpellCardComponent } from './components/dma-spell-card/dma-spell-card.component';
import { DmaSpellDialogComponent } from './components/dma-spell-dialog/dma-spell-dialog.component';

@NgModule({
    imports: [DmaSharedModule, DmaSpellsOverviewRoutingModule],
    declarations: [DmaSpellsOverviewComponent, DmaSpellCardComponent, DmaSpellDialogComponent],
})
export class DmaSpellsOverviewModule {}
