import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaHomeComponent } from './pages/dma-home/dma-home.component';

const routes: Routes = [
    {
        path: '',
        component: DmaHomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class DmaRoutingModule {}
