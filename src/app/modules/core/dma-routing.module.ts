import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaHomeComponent } from './pages/dma-home/dma-home.component';
import { DmaNotFoundComponent } from './pages/dma-not-found/dma-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: DmaHomeComponent,
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
