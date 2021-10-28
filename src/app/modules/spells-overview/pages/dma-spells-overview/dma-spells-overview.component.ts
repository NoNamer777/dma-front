import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DmaSpellsService } from '@dma-spells-overview';

@Component({
    selector: 'dma-spells-overview',
    templateUrl: './dma-spells-overview.component.html',
    styleUrls: ['./dma-spells-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSpellsOverviewComponent implements OnInit {
    /** Whether the page is currently waiting for a response. */
    waitingForResponse = false;

    constructor(
        public spellsService: DmaSpellsService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.getPageNumberFromRoute();
        this.requestSpells();
    }

    /** Sends a GET request to get the Spells. */
    requestSpells(): void {
        this.waitingForResponse = true;

        this.spellsService.getSpells().subscribe(() => {
            this.waitingForResponse = false;
            this.changeDetectorRef.markForCheck();
        });
    }

    /**
     * Requests a specific page of Spells.
     * @param pageNumber the page of Spells to get.
     */
    onRequestPage(pageNumber: number): void {
        this.spellsService.pageNumber = pageNumber;

        this.requestSpells();

        this.router.navigate([], { queryParams: { page: this.spellsService.pageNumber } });
    }

    /**
     * Gets the page number from the current route.
     * @private
     */
    private getPageNumberFromRoute(): void {
        if (this.route.snapshot.queryParams.page === undefined) return;

        this.spellsService.pageNumber = parseInt(this.route.snapshot.queryParams.page, 10);
    }
}
