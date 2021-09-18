import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-home',
    templateUrl: './dma-home.component.html',
    styleUrls: ['./dma-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHomeComponent {}
