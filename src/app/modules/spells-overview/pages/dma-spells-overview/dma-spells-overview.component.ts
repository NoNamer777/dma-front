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

    paginationForm = new FormGroup({
        pageNumber: new FormControl(),
    });

    pageNumbers: number[] = [];

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

    get isOnFirstPage(): boolean {
        return this.spellsService.spellsPage?.first;
    }

    get isOnLastPage(): boolean {
        return this.spellsService.spellsPage?.last;
    }

    isSelected(number: number): boolean {
        return number === this.spellsService.pageNumber;
    }

    /** Sends a GET request to get the Spells. */
    requestSpells(): void {
        this.waitingForResponse = true;
        this.paginationForm.controls.pageNumber.disable({ emitEvent: false, onlySelf: true });

        this.spellsService.getSpells().subscribe({
            next: () => {
                this.waitingForResponse = false;
                this.paginationForm.controls.pageNumber.enable({ onlySelf: true });
                this.paginationForm.controls.pageNumber.patchValue(this.spellsService.pageNumber, { onlySelf: true });
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
     * Requests a specific page of Spells.
     * @param pageNumber the page of Spells to get.
     */
    onRequestPage(pageNumber: number): void {
        this.spellsService.pageNumber = pageNumber;

        this.requestSpells();

        this.router.navigate([], { queryParams: { page: this.spellsService.pageNumber } });
    }

    onChangePageNumber(): void {
        const pageNumberValue = coerceNumberProperty(this.paginationForm.value.pageNumber);

        if (this.paginationForm.value.pageNumber === null || pageNumberValue === this.spellsService.pageNumber) return;

        this.onRequestPage(pageNumberValue);
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
