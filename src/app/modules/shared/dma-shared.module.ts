import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaFaIconsModule } from './dma-fa-icons.module';

@NgModule({
    imports: [CommonModule, DmaFaIconsModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    exports: [CommonModule, DmaFaIconsModule, FormsModule, HttpClientModule, ReactiveFormsModule],
})
export class DmaSharedModule {}
