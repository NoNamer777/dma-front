import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@modules/app-routing.module';
import { DmaIconsModule } from '@modules/dma-icons.module';

import { TOKEN_INTERCEPTOR_PROVIDER } from '@services/interceptors/token.interceptor';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@components/header/header.component';
import { SidenavComponent } from '@components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DmaIconsModule,
    HttpClientModule,
    MatSidenavModule,
  ],
  providers: [
    TOKEN_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
