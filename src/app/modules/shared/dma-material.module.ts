import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    exports: [MatSidenavModule, MatDialogModule, MatSnackBarModule],
    imports: [MatSidenavModule, MatDialogModule, MatSnackBarModule],
})
export class DmaMaterialModule {}
