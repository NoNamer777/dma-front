import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

import { DmaSpellsService, SpellRequestOptions } from '@dma-spells-overview';
import { Pageable, Spell } from '@dma-shared/models';

const INVALID_QUERY_INPUT_EXCEPTION = `You can only use letters (UPPER- and lowercase), and the following symbols: ' /`;

@Component({
    selector: 'dma-spells-overview',
    templateUrl: './dma-spells-overview.component.html',
    styleUrls: ['./dma-spells-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSpellsOverviewComponent implements OnInit, OnDestroy {
    /** Whether the page is currently waiting for a response. */
    waitingForResponse = false;

    /** Form for filtering Spells to fetch. */
    spellQueryForm = new FormGroup({
        page: new FormControl(),
        name: new FormControl(null, Validators.pattern(/^[A-Za-z\/' ]+$/)),
    });

    /** A list of the number of pages. */
    pageNumbers: number[] = [];

    /** Reference to the error snackbar */
    snackbarRef: MatSnackBarRef<TextOnlySnackBar>;

    private destroyed$ = new Subject<void>();

    constructor(
        public spellsService: DmaSpellsService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private snackbar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.getDataFromRoute();

        this.requestSpells(this.spellQueryForm.value);

        this.spellQueryForm.controls.name.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe({
            next: () => this.checkQueryInputForErrors(),
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
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

    /** Whether to be able to send a query. */
    get shouldEnableSubmitQuery(): boolean {
        return (
            this.spellQueryForm.value.name === '' ||
            this.spellQueryForm.value.name === null ||
            this.spellQueryForm.controls.name.hasError('pattern')
        );
    }

    /** When to make the elements smaller. */
    shouldBeSm(topPaginationContainer: HTMLDivElement): boolean {
        return getComputedStyle(topPaginationContainer).display === 'none';
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

    /** Sends a request to find Spells that include the provided characters in the name of the Spell. */
    onRequestSpellsByName(): void {
        this.spellQueryForm.controls.page.patchValue(0);
        this.router.navigate([], { queryParams: { name: this.spellQueryForm.value.name } });

        this.requestSpells({ name: this.spellQueryForm.value.name });
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
        if (this.route.snapshot.queryParams.name !== undefined) {
            this.spellQueryForm.controls.name.patchValue(this.route.snapshot.queryParams.name);
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
     * Dismisses the snackbar and resets the reference.
     * @private
     */
    private dismissSnackbar(): void {
        this.snackbarRef
            .afterDismissed()
            .pipe(takeUntil(this.destroyed$), take(1))
            .subscribe({
                next: () => (this.snackbarRef = null),
            });
        this.snackbarRef.dismiss();
    }

    /**
     * Opens a snackbar containing a error message when a User inputs an incorrect character
     * into the Spell name query input.
     * @private
     */
    private checkQueryInputForErrors(): void {
        if (this.snackbarRef !== null && this.snackbarRef !== undefined) {
            if (this.spellQueryForm.controls.name.valid) {
                this.dismissSnackbar();
            }

            return;
        }
        if (!this.spellQueryForm.controls.name.hasError('pattern')) return;

        this.snackbarRef = this.snackbar.open(INVALID_QUERY_INPUT_EXCEPTION, 'Dismiss', {
            panelClass: ['bg-danger', 'text-light', 'fw-bold'],
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
        });
    }
}
