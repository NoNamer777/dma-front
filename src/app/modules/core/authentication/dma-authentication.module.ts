import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaLoginComponent } from './pages/login/dma-login.component';

@NgModule({
    declarations: [DmaLoginComponent],
    imports: [CommonModule],
    exports: [DmaLoginComponent],
})
export class DmaAuthenticationModule {}
