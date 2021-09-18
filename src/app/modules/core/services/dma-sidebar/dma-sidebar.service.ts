import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DmaSidebarService implements OnDestroy {
    get collapsed(): boolean {
        return this._collapsed;
    }
    private _collapsed = true;

    sidebarOpenedChange$ = new Subject<boolean>();

    ngOnDestroy(): void {
        this.sidebarOpenedChange$.complete();
    }

    get isSidebarOpened(): boolean {
        return !this.collapsed;
    }

    toggle(isCollapsable = true): void {
        if (!isCollapsable) return;

        this._collapsed = !this.collapsed;

        this.sidebarOpenedChange$.next(this.isSidebarOpened);
    }
}
