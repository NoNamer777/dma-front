import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmaMaterialModule } from '@dma-shared/dma-material.module';
import { DmaCollapsingCardComponent } from './components/collapsing-card/dma-collapsing-card.component';
import { DmaNoResultsComponent } from './components/no-results/dma-no-results.component';
import { DmaFaIconsModule } from './dma-fa-icons.module';

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
