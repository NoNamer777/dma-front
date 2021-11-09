import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';

@Component({
    selector: 'dma-home',
    templateUrl: './dma-home.component.html',
    styleUrls: ['./dma-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHomeComponent {
    constructor(titleService: DmaTitleService) {
        titleService.pageTitle = ' - Home';
    }
}
