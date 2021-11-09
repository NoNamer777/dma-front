import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dmaCenterExpandAnimation } from '@dma-core/animations';
import { DmaSidebarService } from '@dma-core/services/dma-sidebar/dma-sidebar.service';

@Component({
    selector: 'dma-center',
    templateUrl: './dma-center.component.html',
    styleUrls: ['./dma-center.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [dmaCenterExpandAnimation],
})
export class DmaCenterComponent {
    constructor(public sidebarService: DmaSidebarService) {}

    get headerHeight(): number {
        const headerHeight = window.getComputedStyle(document.querySelector('dma-header')).height;
        const centerMarginTop = window.getComputedStyle(document.querySelector('dma-center')).marginTop;

        return parseInt(headerHeight.replace('px', '')) + parseInt(centerMarginTop.replace('px', ''));
    }
}
