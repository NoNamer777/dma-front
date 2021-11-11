import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';

export const DIRECTED_MESSAGE = 'a bit lost.';
export const REDIRECTED_MESSAGE = 'trying to visit a part of the website that does not exist.';

@Component({
    selector: 'dma-not-found',
    templateUrl: './dma-not-found.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaNotFoundComponent implements OnDestroy {
    destroyed$ = new Subject<void>();

    get url(): string {
        return this._url;
    }
    private _url = '';

    constructor(private router: Router, titleService: DmaTitleService) {
        titleService.pageTitle = ' - Not Found';

        this.router.events
            .pipe(takeUntil(this.destroyed$))
            .subscribe((routingEvent) => this.getNavigatedURL(routingEvent));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    get message(): string {
        return !!this.url ? REDIRECTED_MESSAGE : DIRECTED_MESSAGE;
    }

    private getNavigatedURL(routingEvent: unknown): void {
        if (!(routingEvent instanceof NavigationEnd)) return;

        this._url = `${location.protocol}//${location.host}${(routingEvent as NavigationEnd).url}`;

        if (this.url === location.href) {
            this._url = null;
        }
    }
}
