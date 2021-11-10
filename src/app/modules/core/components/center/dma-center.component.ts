import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaSidebarService } from '@dma-core/services/dma-sidebar/dma-sidebar.service';

@Component({
    selector: 'dma-center',
    templateUrl: './dma-center.component.html',
    styleUrls: ['./dma-center.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaCenterComponent {
    constructor(public sidebarService: DmaSidebarService) {}

    get headerHeight(): number {
        const fontsize = getComputedStyle(document.documentElement).fontSize.replace('px', '');

        return parseInt(fontsize, 10) * 4.7;
    }
}
