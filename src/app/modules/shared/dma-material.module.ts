import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    exports: [MatSidenavModule, MatDialogModule, MatSnackBarModule],
    imports: [MatSidenavModule, MatDialogModule, MatSnackBarModule],
})
export class DmaMaterialModule {}
