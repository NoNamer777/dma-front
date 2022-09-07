import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaFaIconsModule } from '@dma-shared';
import { DmaLoginComponent } from './pages/login/dma-login.component';

@NgModule({
    declarations: [DmaLoginComponent],
    imports: [CommonModule, DmaFaIconsModule, FormsModule, ReactiveFormsModule],
    exports: [DmaLoginComponent],
})
export class DmaAuthenticationModule {}
