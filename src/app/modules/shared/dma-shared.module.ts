import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaFaIconsModule } from './dma-fa-icons.module';
import { DmaMaterialModule } from '@dma-shared/dma-material.module';

@NgModule({
    imports: [CommonModule, DmaFaIconsModule, DmaMaterialModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    exports: [CommonModule, DmaFaIconsModule, DmaMaterialModule, FormsModule, HttpClientModule, ReactiveFormsModule],
})
export class DmaSharedModule {}
