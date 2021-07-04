import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@modules/app-routing.module';

import { DmaIconsModule } from '@modules/dma-icons.module';
import { DmaMaterialModule } from '@modules/dma-material.module';

import { TOKEN_INTERCEPTOR_PROVIDER } from '@services/interceptors/token.interceptor';
import { ERROR_INTERCEPTOR_PROVIDER } from '@services/interceptors/error.interceptor';
import { DMA_ERROR_HANDLER_PROVIDER } from '@services/error-handler.service';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@components/header/header.component';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ErrorDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    DmaIconsModule,
    DmaMaterialModule,
    HttpClientModule,
  ],
  providers: [
    DMA_ERROR_HANDLER_PROVIDER,
    ERROR_INTERCEPTOR_PROVIDER,
    TOKEN_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
