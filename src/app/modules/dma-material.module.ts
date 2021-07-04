import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
  ],
})
export class DmaMaterialModule {}
