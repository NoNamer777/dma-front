import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { DmaSidebarService } from '@dma-core';
import { findParentElement } from '@dma-shared';

@Component({
    selector: 'dma-sidebar',
    templateUrl: './dma-sidebar.component.html',
    styleUrls: ['./dma-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSidebarComponent {
    constructor(private sidebarService: DmaSidebarService) {}

    @HostListener(':click', ['$event'])
    onClick(clickEvent: MouseEvent): void {
        let target = clickEvent.target as HTMLElement;
        target = findParentElement(target, ['a']);

        if (target?.tagName.toLowerCase() !== 'a') return;

        this.sidebarService.toggle();
    }
}
