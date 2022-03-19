import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaAboutComponent } from './pages/about/dma-about.component';
import { DmaHomeComponent } from './pages/home/dma-home.component';
import { DmaNotFoundComponent } from './pages/not-found/dma-not-found.component';
import { DmaPrivacyPolicyComponent } from './pages/privacy-policy/dma-privacy-policy.component';

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
        path: 'about',
        component: DmaAboutComponent,
    },
    {
        path: 'privacy',
        component: DmaPrivacyPolicyComponent,
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
