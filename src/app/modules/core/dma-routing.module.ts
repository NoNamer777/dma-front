import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaHomeComponent } from './pages/home/dma-home.component';
import { DmaNotFoundComponent } from './pages/not-found/dma-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: DmaHomeComponent,
    },
    {
        path: 'spells',
        loadChildren: () =>
            import('@dma-spells-overview/dma-spells-overview.module').then((module) => module.DmaSpellsOverviewModule),
    },
    {
        path: 'not-found',
        component: DmaNotFoundComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class DmaRoutingModule {}
