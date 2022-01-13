import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { DmaSidebarService } from '@dma-core/services/dma-sidebar/dma-sidebar.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, interval, Subject, takeUntil, takeWhile } from 'rxjs';

// Breakpoint for small devices as documented by Bootstrap.
// Source: https://getbootstrap.com/docs/5.1/layout/breakpoints/
const BS_MD_BREAKPOINT = 768;

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrls: ['./dma-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHeaderComponent implements AfterViewInit, OnDestroy {
    btnOffset = '';

    @ViewChild('toggleCollapseNavBtn')
    private toggleCollapseNavBtn: ElementRef<HTMLButtonElement>;

    private destroy = new Subject<void>();

    private btnIconInitialized = new BehaviorSubject<boolean>(false);

    constructor(public sidebarService: DmaSidebarService, private cdRef: ChangeDetectorRef) {}

    @HostListener('window:resize')
    get isCollapsable(): boolean {
        const documentWidth = parseFloat(getComputedStyle(document.documentElement).width.replace('px', ''));

        // Look for a document width something slightly smaller than the breakpoint itself.
        return documentWidth < BS_MD_BREAKPOINT - 0.2;
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    ngAfterViewInit(): void {
        interval(50)
            .pipe(
                takeUntil(this.destroy),
                takeWhile(() => this.btnIconInitialized.value === false),
            )
            .subscribe(() => this.checkBtnIconInitialized());
    }

    get toggleCollapseNavBtnIcon(): IconProp {
        return this.sidebarService.collapsed ? 'bars' : 'times';
    }

    @HostListener('window:resize')
    private checkBtnIconInitialized(): void {
        if (
            getComputedStyle(this.toggleCollapseNavBtn.nativeElement.firstElementChild.firstElementChild).width ===
            '0px'
        )
            return;

        this.btnOffset = `-${getComputedStyle(this.toggleCollapseNavBtn.nativeElement).width}`;
        this.btnIconInitialized.next(true);
        this.cdRef.markForCheck();
    }
}
