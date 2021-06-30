import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatSidenavModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatSidenavModule,
  ],
})
export class DmaMaterialModule {}
