import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from '@angular/core';
import { dmaHeaderShadowAnimation } from '@dma-core/animations';
import { DmaSidebarService } from '@dma-core/services/dma-sidebar/dma-sidebar.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Breakpoint for small devives as documented by Bootstrap.
// Source: https://getbootstrap.com/docs/5.1/layout/breakpoints/
const BS_MD_BREAKPOINT = 768;

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrls: ['./dma-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [dmaHeaderShadowAnimation],
})
export class DmaHeaderComponent implements AfterContentChecked {
    @ViewChild('toggleCollapseNavBtn', { static: true })
    private toggleCollapseNavBtn: ElementRef;

    constructor(public sidebarService: DmaSidebarService, private changeDetectorRef: ChangeDetectorRef) {}

    ngAfterContentChecked(): void {
        this.changeDetectorRef.markForCheck();
    }

    @HostListener('window:resize')
    brandOffset(): string {
        const toggleCollapseNavBtnWidth = parseInt(
            window.getComputedStyle(this.toggleCollapseNavBtn.nativeElement).width.replace('px', ''),
            10,
        );
        const offset = toggleCollapseNavBtnWidth / 2;

        return this.isCollapsable ? `translateX(${offset}px)` : '';
    }

    get isCollapsable(): boolean {
        const documentWidth = parseInt(window.getComputedStyle(document.documentElement).width.replace('px', ''), 10);

        // Look for a document width something slightly smaller than the breakpoint itself.
        return documentWidth < BS_MD_BREAKPOINT - 0.2;
    }

    get toggleCollapseNavBtnIcon(): IconProp {
        return this.sidebarService.collapsed ? 'bars' : 'times';
    }
}
