import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DmaTitleService, extractQueryParam, Pageable, SpellModel } from '@dma-shared';
import { DmaSpellsService, SpellRequestOptions } from '@dma-spells-overview';
import { Subject, take, takeUntil } from 'rxjs';

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
        page: new FormControl(0),
        name: new FormControl('', Validators.pattern(/^[A-Za-z\/' ]+$/)),
    });

    /** A list of the number of pages. */
    pageNumbers: number[] = [];

    /** Reference to the error snackbar */
    private snackbarRef: MatSnackBarRef<TextOnlySnackBar>;

    private destroyed$ = new Subject<void>();

    constructor(
        public spellsService: DmaSpellsService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private snackbar: MatSnackBar,
        titleService: DmaTitleService,
    ) {
        titleService.pageTitle = ' - Spells';
    }

    ngOnInit(): void {
        this.updateFormFromQueryParams();

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
    get shouldDisableReset(): boolean {
        const queryParamSpellName = this.route.snapshot.queryParamMap.get('name');

        if (queryParamSpellName !== null && this.spellQueryForm.controls.name.value !== queryParamSpellName) {
            return false;
        }
        return this.spellQueryForm.controls.name.value === '' && this.spellQueryForm.controls.page.value === 0;
    }

    /** Whether to be able to send a query. */
    get shouldDisableSubmitQuery(): boolean {
        return (
            this.spellQueryForm.controls.name.invalid ||
            this.spellQueryForm.controls.name.pristine ||
            this.spellQueryForm.controls.name.value === '' ||
            this.spellQueryForm.controls.name.value === this.route.snapshot.queryParamMap.get('name')
        );
    }

    get hasResults(): boolean {
        return this.spellsService.spellsPage?.content.length !== 0;
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
        this.router.navigate([], page === 0 ? {} : { queryParams: { page: page }, queryParamsHandling: 'merge' });

        this.requestSpells(this.spellQueryForm.value);
    }

    /** Sends a request of a specific Spell page. */
    onChangePageNumber(): void {
        const currentSpellPageNumber = this.spellQueryForm.controls.page.value;
        const spellPageQueryParam = extractQueryParam<number>(this.route.snapshot, 'page', 'number') ?? 0;

        if (spellPageQueryParam === currentSpellPageNumber) {
            return;
        }
        this.onRequestPage(currentSpellPageNumber);
    }

    /** Sends a request to find Spells that include the provided characters in the name of the Spell. */
    onRequestSpellsByName(): void {
        if (this.shouldDisableSubmitQuery) return;

        this.spellQueryForm.controls.page.patchValue(0);
        this.router.navigate([], { queryParams: { name: this.spellQueryForm.value.name } });

        this.requestSpells({ name: this.spellQueryForm.value.name });
    }

    /** Resets the query form. */
    onResetQueryForm(): void {
        this.spellQueryForm.reset({ page: 0, name: '' });
        this.router.navigate([]);

        this.requestSpells();
    }

    /** Sends a GET request to fetch the Spells. */
    private requestSpells(options?: SpellRequestOptions): void {
        this.waitingForResponse = true;
        this.spellQueryForm.disable();

        this.spellsService.getSpells(options).subscribe({
            next: () => {
                this.waitingForResponse = false;
                this.spellQueryForm.enable();
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
                } as Pageable<SpellModel>;

                this.changeDetectorRef.markForCheck();
            },
        });
    }

    /**
     * Updates the form from the current query params.
     * @private
     */
    private updateFormFromQueryParams(): void {
        this.spellQueryForm.controls.page.patchValue(
            extractQueryParam<number>(this.route.snapshot, 'page', 'number') ?? 0,
        );
        this.spellQueryForm.controls.name.patchValue(extractQueryParam(this.route.snapshot, 'name', 'string') ?? '');
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
                next: () => {
                    this.snackbarRef = null;
                    this.spellQueryForm.controls.page.enable();
                },
            });
        this.snackbarRef.dismiss();
    }

    /**
     * Opens a snackbar containing an error message when a User inputs an incorrect character
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

        this.spellQueryForm.controls.page.disable();
        this.snackbarRef = this.snackbar.open(INVALID_QUERY_INPUT_EXCEPTION, 'Dismiss', {
            panelClass: ['bg-danger', 'text-light', 'fw-bold'],
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
        });
    }
}
