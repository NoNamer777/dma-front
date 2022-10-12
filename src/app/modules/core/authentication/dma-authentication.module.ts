import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DmaFaIconsModule } from '@dma-shared';
import { DmaLoginComponent } from './pages/login/dma-login.component';
import { DmaSignUpComponent } from './pages/sign-up/dma-sign-up.component';

@NgModule({
    declarations: [DmaLoginComponent, DmaSignUpComponent],
    imports: [CommonModule, DmaFaIconsModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [DmaLoginComponent, DmaSignUpComponent],
})
export class DmaAuthenticationModule {}
