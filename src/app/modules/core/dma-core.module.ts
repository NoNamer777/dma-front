import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SERIALIZE_INTERCEPTOR_PROVIDER } from '@dma-core/services/interceptors/serialize.interceptor';
import { DmaSharedModule } from '@dma-shared';
import { DmaCenterComponent } from './components/center/dma-center.component';
import { DmaFooterComponent } from './components/footer/dma-footer.component';
import { DmaHeaderComponent } from './components/header/dma-header.component';
import { DmaSidebarComponent } from './components/sidebar/dma-sidebar.component';
import { DmaRoutingModule } from './dma-routing.module';
import { DmaAboutComponent } from './pages/about/dma-about.component';
import { DmaHomeComponent } from './pages/home/dma-home.component';
import { DmaNotFoundComponent } from './pages/not-found/dma-not-found.component';
import { DmaPrivacyPolicyComponent } from './pages/privacy-policy/dma-privacy-policy.component';

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
        DmaPrivacyPolicyComponent,
    ],
    exports: [
        DmaAboutComponent,
        DmaCenterComponent,
        DmaFooterComponent,
        DmaHeaderComponent,
        DmaHomeComponent,
        DmaNotFoundComponent,
        DmaPrivacyPolicyComponent,
    ],
    providers: [SERIALIZE_INTERCEPTOR_PROVIDER],
})
export class DmaCoreModule {}
