import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaFaIconsModule } from './dma-fa-icons.module';

@NgModule({
    imports: [CommonModule, DmaFaIconsModule, FormsModule, ReactiveFormsModule],
    exports: [CommonModule, DmaFaIconsModule, FormsModule, ReactiveFormsModule],
})
export class DmaSharedModule {}
