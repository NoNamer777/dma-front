import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaFaIconsModule } from './dma-fa-icons.module';
import { DmaMaterialModule } from '@dma-shared/dma-material.module';
import { DmaNoResultsComponent } from './components/no-results/dma-no-results.component';
import { DmaCollapsingCardComponent } from './components/collapsing-card/dma-collapsing-card.component';

@NgModule({
    imports: [CommonModule, DmaFaIconsModule, DmaMaterialModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    declarations: [DmaNoResultsComponent, DmaCollapsingCardComponent],
    exports: [
        CommonModule,
        DmaFaIconsModule,
        DmaMaterialModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DmaNoResultsComponent,
        DmaCollapsingCardComponent,
    ],
})
export class DmaSharedModule {}
