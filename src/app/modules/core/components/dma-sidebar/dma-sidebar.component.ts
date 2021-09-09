import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-sidebar',
    templateUrl: './dma-sidebar.component.html',
    styleUrls: ['./dma-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSidebarComponent {}
