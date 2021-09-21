import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaSpellsOverviewComponent } from './pages/dma-spells-overview/dma-spells-overview.component';

const routes: Routes = [
    {
        path: '',
        component: DmaSpellsOverviewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DmaSpellsOverviewRoutingModule {}
