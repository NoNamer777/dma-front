import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DmaSpellsService } from '@dma-spells-overview';
import { Pageable, Spell } from '@dma-shared/models';
import { FormControl, FormGroup } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'dma-spells-overview',
    templateUrl: './dma-spells-overview.component.html',
    styleUrls: ['./dma-spells-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSpellsOverviewComponent implements OnInit {
    /** Whether the page is currently waiting for a response. */
    waitingForResponse = false;

    /** Form for filtering Spells to fetch. */
    spellQueryForm = new FormGroup({
        page: new FormControl(),
    });

    /** A list of the number of pages. */
    pageNumbers: number[] = [];

    constructor(
        public spellsService: DmaSpellsService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.getDataFromRoute();

        this.requestSpells(this.spellQueryForm.value);
    }

    /** If the pagination is showing the first page. */
    get isOnFirstPage(): boolean {
        return this.spellsService.spellsPage?.first;
    }

    /** If the pagination is showing the last page. */
    get isOnLastPage(): boolean {
        return this.spellsService.spellsPage?.last;
    }

    /** When to be able to reset the query form. */
    get shouldEnableUndo(): boolean {
        return JSON.stringify(this.route.snapshot.queryParams) === '{}';
    }

    /**
     * Requests a specific page of Spells.
     * @param page the page number of Spells to get.
     */
    onRequestPage(page: number): void {
        this.spellQueryForm.controls.page.patchValue(page);
        this.router.navigate([], { queryParams: { page: page }, queryParamsHandling: 'merge' });

        this.requestSpells(this.spellQueryForm.value);
    }

    /** Sends a request of a specific Spell page. */
    onChangePageNumber(): void {
        const pageNumberValue = coerceNumberProperty(this.spellQueryForm.value.page);

        if (
            this.spellQueryForm.value.page === null ||
            parseInt(this.route.snapshot.queryParams.page ?? 0, 10) === pageNumberValue
        )
            return;

        this.onRequestPage(pageNumberValue);
    }

    /** Resets the query form. */
    onResetQueryForm(): void {
        this.spellQueryForm.reset();
        this.router.navigate([]);

        this.requestSpells();
    }

    /** Sends a GET request to get the Spells. */
    private requestSpells(options?: SpellRequestOptions): void {
        this.waitingForResponse = true;
        this.spellQueryForm.controls.page.disable({ onlySelf: true });

        this.spellsService.getSpells(options).subscribe({
            next: () => {
                this.waitingForResponse = false;
                this.spellQueryForm.controls.page.enable({ onlySelf: true });
                this.spellQueryForm.controls.page.patchValue(this.spellsService.spellsPage.pageable.pageNumber, {
                    onlySelf: true,
                });
                this.resetListOfPageNumbers();

                this.changeDetectorRef.markForCheck();
            },
            error: () => {
                this.waitingForResponse = false;

                this.spellsService.spellsPage = {
                    content: [],
                    pageable: {
                        pageNumber: 0,
                    },
                    totalPages: 0,
                    first: true,
                    last: true,
                } as Pageable<Spell>;

                this.changeDetectorRef.markForCheck();
            },
        });
    }

    /**
     * Gets data from the current route.
     * @private
     */
    private getDataFromRoute(): void {
        if (this.shouldEnableUndo) return;

        if (this.route.snapshot.queryParams.page !== undefined) {
            this.spellQueryForm.controls.page.patchValue(parseInt(this.route.snapshot.queryParams.page, 10));
        }
    }

    /**
     * Resets the list of available Spell pages.
     * @private
     */
    private resetListOfPageNumbers(): void {
        this.pageNumbers = [];

        for (let page = 0; page < this.spellsService.spellsPage.totalPages; page++) {
            this.pageNumbers.push(page);
        }
    }

    /**
     * Gets the page number from the current route.
     * @private
     */
    private getPageNumberFromRoute(): void {
        if (this.route.snapshot.queryParams.page === undefined) return;

        this.spellsService.pageNumber = parseInt(this.route.snapshot.queryParams.page, 10);
    }

    private resetListOfPageNumbers(): void {
        this.pageNumbers = [];

        for (let page = 0; page < this.spellsService.spellsPage.totalPages; page++) {
            this.pageNumbers.push(page);
        }
    }
}
