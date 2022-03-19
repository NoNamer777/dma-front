import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaTitleService } from '@dma-shared';

@Component({
    selector: 'dma-home',
    templateUrl: './dma-home.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHomeComponent {
    constructor(titleService: DmaTitleService) {
        titleService.pageTitle = ' - Home';
    }
}
