import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

type CollapsedIcon = 'chevron-down' | 'chevron-up';

@Component({
    selector: 'dma-collapsing-card',
    templateUrl: './dma-collapsing-card.component.html',
    styleUrls: ['./dma-collapsing-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaCollapsingCardComponent implements AfterViewInit {
    @Input()
    set opened(value: unknown) {
        this.collapsed = !coerceBooleanProperty(value);
    }

    @ViewChild('cardBodyElement')
    private cardBodyElement: ElementRef<HTMLDivElement>;

    private collapsed = true;

    ngAfterViewInit(): void {
        this.showCardContent();
    }

    get collapsedIcon(): CollapsedIcon {
        return this.collapsed ? 'chevron-down' : 'chevron-up';
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }

    private showCardContent(): void {
        if (this.collapsed) return;

        this.cardBodyElement.nativeElement.classList.add('show');
    }
}
