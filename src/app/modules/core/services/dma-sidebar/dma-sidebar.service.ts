import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DmaSidebarService implements OnDestroy {
    collapsed = true;

    sidebarOpenedChange$ = new Subject<boolean>();

    ngOnDestroy(): void {
        this.sidebarOpenedChange$.complete();
    }

    get isSidebarOpened(): boolean {
        return !this.collapsed;
    }

    toggle(): void {
        this.collapsed = !this.collapsed;

        this.sidebarOpenedChange$.next(this.isSidebarOpened);
    }
}
