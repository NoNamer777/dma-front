import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    exports: [MatSidenavModule, MatDialogModule],
    imports: [MatSidenavModule, MatDialogModule],
})
export class DmaMaterialModule {}
