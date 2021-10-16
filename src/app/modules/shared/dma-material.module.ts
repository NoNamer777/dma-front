import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [BrowserAnimationsModule, MatSidenavModule, MatDialogModule],
    exports: [BrowserAnimationsModule, MatSidenavModule, MatDialogModule],
})
export class DmaMaterialModule {}
