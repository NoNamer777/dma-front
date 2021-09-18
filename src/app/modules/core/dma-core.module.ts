import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DmaSharedModule } from '@dma-shared';
import { DmaCenterComponent } from './components/dma-center/dma-center.component';
import { DmaHeaderComponent } from './components/dma-header/dma-header.component';
import { DmaSidebarComponent } from './components/dma-sidebar/dma-sidebar.component';
import { DmaMaterialModule } from './dma-material.module';
import { DmaRoutingModule } from './dma-routing.module';
import { DmaHomeComponent } from './pages/dma-home/dma-home.component';
import { DmaNotFoundComponent } from './pages/dma-not-found/dma-not-found.component';

@NgModule({
    imports: [BrowserModule, DmaMaterialModule, DmaRoutingModule, DmaSharedModule],
    declarations: [DmaCenterComponent, DmaHeaderComponent, DmaSidebarComponent, DmaHomeComponent, DmaNotFoundComponent],
    exports: [DmaCenterComponent, DmaHeaderComponent, DmaHomeComponent, DmaNotFoundComponent],
})
export class DmaCoreModule {}
