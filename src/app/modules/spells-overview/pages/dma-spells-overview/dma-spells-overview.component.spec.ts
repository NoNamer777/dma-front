import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@dma-environment';
import { DmaNoResultsComponent, Spell, SpellModel } from '@dma-shared';
import { SpellRequestOptions } from '@dma-spells-overview';
import { DmaSpellCardComponent } from '@dma-spells-overview/components/dma-spell-card/dma-spell-card.component';
import { dispatchEvent } from '@dma-testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { DmaSpellsOverviewComponent } from './dma-spells-overview.component';

describe('DmaSpellsOverviewComponent', () => {
    let fixture: ComponentFixture<DmaSpellsOverviewComponent>;
    let element: HTMLElement;

    let httpTestingController: HttpTestingController;

    const mockSpell1 = new SpellModel({
        id: 'spell-1',
        name: 'My Awesome Spell 1',
    } as Spell);
    const mockSpell2 = new SpellModel({
        id: 'spell-2',
        name: 'My Awesome Spell 2',
    } as Spell);

    const testRoutes: Route[] = [
        {
            path: 'spells',
            component: DmaSpellsOverviewComponent,
        },
    ];

    function initialize(expectedResponse: Record<string, unknown>, filterOptions: SpellRequestOptions = {}): void {
        let expectedUrl = `${environment.baseServerUrl}/api/spell`;

        if (JSON.stringify(filterOptions) !== '{}') {
            expectedUrl += '?';

            for (const option in filterOptions) {
                if (!expectedUrl.includes('?')) {
                    expectedUrl += '?';
                }
                if (!expectedUrl.endsWith('?')) {
                    expectedUrl += '&';
                }
                expectedUrl += `${option}=${filterOptions[option]}`;
            }

            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    snapshot: {
                        queryParamMap: convertToParamMap(filterOptions),
                    },
                },
            });
        }
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(DmaSpellsOverviewComponent);

        element = fixture.nativeElement;

        fixture.detectChanges();

        httpTestingController.expectOne(expectedUrl).flush(expectedResponse);

        fixture.detectChanges();
    }

    async function sendInput(inputValue: string, inputElement: HTMLInputElement): Promise<void> {
        inputElement.value = inputValue;
        dispatchEvent(inputElement, new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                FontAwesomeTestingModule,
                MatDialogModule,
                MatSnackBarModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(testRoutes),
            ],
            declarations: [DmaSpellsOverviewComponent, DmaSpellCardComponent, DmaNoResultsComponent],
        }).compileComponents();
    });

    afterEach(inject([OverlayContainer], async (oc: OverlayContainer) => {
        // The overlay container's `ngOnDestroy` won't be called between test runs so we need
        // to call it ourselves, in order to avoid leaking containers between tests and potentially
        // throwing `querySelector` calls.
        oc.ngOnDestroy();

        httpTestingController.verify();
    }));

    it('should show received Spells as cards in the overview template', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const spellCards = element.querySelectorAll('dma-spell-card');

        expect(spellCards.length).toBe(2);
    });

    it('should not be able to request the previous page on the first page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        expect(element.querySelector('button.previous-btn').getAttribute('disabled')).toBe('');
    });

    it('should not be able to request the next page on the last page', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
                pageable: {
                    pageNumber: 1,
                },
                totalPages: 2,
            },
            { page: 1 },
        );

        expect(element.querySelector('button.next-btn').getAttribute('disabled')).toBe('');
    });

    it('should get the page number from the route', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
                pageable: {
                    pageNumber: 1,
                },
                totalPages: 2,
            },
            {
                page: 1,
            },
        );

        expect(element.querySelector('button.next-btn').getAttribute('disabled')).toBe('');
        expect(element.querySelector('button.previous-btn').getAttribute('disabled')).toBe(null);
    });

    it('should be able to request the previous page when not on the first page', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
                pageable: {
                    pageNumber: 1,
                },
                totalPages: 2,
            },
            {
                page: 1,
            },
        );

        const previousBtn = element.querySelector('button.previous-btn');

        expect(previousBtn.getAttribute('disabled')).toBe(null);

        dispatchEvent(previousBtn, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell`).flush({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });
        fixture.detectChanges();

        expect(previousBtn.getAttribute('disabled')).toBe('');
    });

    it('should be able to request the next page when not on the last page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const nextBtn = element.querySelector('button.next-btn');

        expect(nextBtn.getAttribute('disabled')).toBe(null);

        dispatchEvent(nextBtn, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell?page=1`).flush({
            content: [mockSpell1, mockSpell2],
            first: false,
            last: true,
            pageable: {
                pageNumber: 1,
            },
            totalPages: 2,
        });
        fixture.detectChanges();

        expect(nextBtn.getAttribute('disabled')).toBe('');
    });

    it('should request a specific page when selecting one in the pagination select', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const paginationSelect = element.querySelector(`select[formControlName='page']`);
        dispatchEvent(paginationSelect, new MouseEvent('click'));
        fixture.detectChanges();

        fixture.componentInstance.spellQueryForm.controls.page.setValue(1);
        dispatchEvent(paginationSelect, new Event('change'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell?page=1`).flush({
            content: [mockSpell1, mockSpell2],
            first: false,
            last: true,
            pageable: {
                pageNumber: 1,
            },
            totalPages: 2,
        });

        fixture.detectChanges();

        expect(element.querySelector('button.previous-btn').getAttribute('disabled')).toBe(null);
        expect(element.querySelector('button.next-btn').getAttribute('disabled')).toBe('');
    });

    it('should not request a page when already on that page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const paginationSelect = element.querySelector(`select[formControlName='page']`);
        dispatchEvent(paginationSelect, new MouseEvent('click'));
        fixture.detectChanges();

        dispatchEvent(paginationSelect, new Event('change'));
        fixture.detectChanges();

        httpTestingController.expectNone(`${environment.baseServerUrl}/api/spell`);

        expect(element.querySelector('button.previous-btn').getAttribute('disabled')).toBe('');
        expect(element.querySelector('button.next-btn').getAttribute('disabled')).toBe(null);
    });

    it('should be able to reset the spells form when the name input has a different value', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
                pageable: {
                    pageNumber: 1,
                },
                totalPages: 2,
            },
            {
                name: 'hello',
            },
        );

        const nameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;
        const resetBtn = element.querySelector('button#reset-btn') as HTMLButtonElement;

        expect(resetBtn.disabled).toBe(false);
        expect(nameInput.value).toBe('hello');

        nameInput.value = 'hello there';
        dispatchEvent(nameInput, new Event('input'));
        fixture.detectChanges();

        expect(nameInput.value).toBe('hello there');
        expect(resetBtn.disabled).toBe(false);
    });

    it('should reset the Spells when not on the first page', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
                pageable: {
                    pageNumber: 1,
                },
                totalPages: 2,
            },
            {
                page: 1,
            },
        );

        const resetFormButton = element.querySelector('button#reset-btn');

        expect(resetFormButton.getAttribute('disabled')).toBe(null);

        dispatchEvent(resetFormButton, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell`).flush({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });
        fixture.detectChanges();

        expect(resetFormButton.getAttribute('disabled')).toBe('');
    });

    xit('should show an error when inserting an incorrect character', async () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const spellNameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;
        await sendInput('%', spellNameInput);

        expect(document.querySelector('snack-bar-container')).not.toBe(null);
    });

    xit('should hide the invalid character error when the character is removed', async () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const spellNameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;
        await sendInput('%', spellNameInput);

        expect(document.querySelector('snack-bar-container')).not.toBe(null);

        await sendInput('', spellNameInput);

        expect(document.querySelector('snack-bar-container')).toBe(null);
    });

    xit(`should not open another snackbar when there's already one open`, async () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const spellNameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;
        await sendInput('%', spellNameInput);

        expect(document.querySelector('snack-bar-container')).not.toBe(null);

        await sendInput('^', spellNameInput);

        expect(document.querySelector('snack-bar-container')).not.toBe(null);
    });

    it('should not be able to reset when on the first page or no query input is provided', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        expect(element.querySelector('button#reset-btn').getAttribute('disabled')).toBe('');
    });

    it('should request spells by contain the query', () => {
        initialize({
            content: [mockSpell1],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        const submitBtn = element.querySelector('button#submit-query-btn');
        const spellNameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;

        spellNameInput.value = 'awesome';
        dispatchEvent(spellNameInput, new Event('input'));
        fixture.detectChanges();

        dispatchEvent(submitBtn, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell?name=awesome`).flush({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 2,
        });

        fixture.detectChanges();

        expect(element.querySelectorAll('dma-spell-card').length).toBe(2);
    });

    it('should request spells by name on page load', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: true,
                last: false,
                pageable: {
                    pageNumber: 0,
                },
                totalPages: 2,
            },
            {
                name: 'awesome',
            },
        );

        expect((element.querySelector(`input[formControlName='name']`) as HTMLInputElement).value).toBe('awesome');
    });

    it('should show the no results message when no results are found', () => {
        initialize({
            content: [],
            first: true,
            last: true,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 0,
        });

        expect(element.querySelector('dma-no-results')).not.toBe(null);
    });

    it('should show the no results message on error', () => {
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(DmaSpellsOverviewComponent);

        element = fixture.nativeElement;

        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseServerUrl}/api/spell`).flush(
            new HttpErrorResponse({
                error: new Error('An unknown error has occurred.'),
                status: 0,
                statusText: 'Unknown error',
            }),
        );

        fixture.detectChanges();

        expect(element.querySelector('dma-no-results')).not.toBe(null);
    });

    it('should not send request spells by name when input should be disabled when pressing enter', () => {
        initialize({
            content: [],
            first: true,
            last: true,
            pageable: {
                pageNumber: 0,
            },
            totalPages: 0,
        });

        const nameInput = element.querySelector(`input[formControlName='name']`) as HTMLInputElement;

        dispatchEvent(nameInput, new KeyboardEvent('keyup', { key: 'enter' }));

        httpTestingController.expectNone(`${environment.baseServerUrl}/spell?name=`);
        expect(nameInput.value).toBe('');
    });
});
