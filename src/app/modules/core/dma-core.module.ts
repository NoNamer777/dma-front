import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DmaSharedModule } from '@dma-shared';
import { DmaCenterComponent } from './components/center/dma-center.component';
import { DmaHeaderComponent } from './components/header/dma-header.component';
import { DmaSidebarComponent } from './components/sidebar/dma-sidebar.component';
import { DmaRoutingModule } from './dma-routing.module';
import { DmaHomeComponent } from './pages/home/dma-home.component';
import { DmaNotFoundComponent } from './pages/not-found/dma-not-found.component';
import { DmaFooterComponent } from './components/footer/dma-footer.component';
import { DmaAboutComponent } from './pages/about/dma-about.component';

import { SERIALIZE_INTERCEPTOR_PROVIDER } from '@dma-core/services/interceptors/serialize.interceptor';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, DmaRoutingModule, DmaSharedModule],
    declarations: [
        DmaAboutComponent,
        DmaCenterComponent,
        DmaFooterComponent,
        DmaHeaderComponent,
        DmaHomeComponent,
        DmaNotFoundComponent,
        DmaSidebarComponent,
    ],
    exports: [
        DmaAboutComponent,
        DmaCenterComponent,
        DmaFooterComponent,
        DmaHeaderComponent,
        DmaHomeComponent,
        DmaNotFoundComponent,
    ],
    providers: [SERIALIZE_INTERCEPTOR_PROVIDER],
})
export class DmaCoreModule {}
