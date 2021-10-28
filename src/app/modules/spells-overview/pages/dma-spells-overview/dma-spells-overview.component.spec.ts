import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '../../../../../environments/environment';
import { dispatchEvent } from '../../../../../../testing/fake-events';
import { DmaSpellsOverviewComponent } from './dma-spells-overview.component';
import { DmaSpellCardComponent } from '@dma-spells-overview/components/dma-spell-card/dma-spell-card.component';
import { Spell } from '@dma-shared/models';

describe('DmaSpellsOverviewComponent', () => {
    let fixture: ComponentFixture<DmaSpellsOverviewComponent>;
    let element: HTMLElement;

    let httpTestingController: HttpTestingController;

    const mockSpell1 = new Spell('spell-1');
    mockSpell1.name = 'My Awesome Spell 1';

    const mockSpell2 = new Spell('spell-2');
    mockSpell2.name = 'My Awesome Spell 2';

    const testRoutes: Route[] = [
        {
            path: 'spells',
            component: DmaSpellsOverviewComponent,
        },
    ];

    function initialize(expectedResponse: Record<string, unknown>, pageNumber?: number): void {
        let expectedUrl = `${environment.baseApiUrl}/spell`;

        if (pageNumber !== undefined) {
            expectedUrl += `?page=${pageNumber}`;

            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    snapshot: {
                        queryParams: {
                            page: `${pageNumber}`,
                        },
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatDialogModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes(testRoutes),
            ],
            declarations: [DmaSpellsOverviewComponent, DmaSpellCardComponent],
        }).compileComponents();
    });

    afterEach(() => httpTestingController.verify());

    it('should show received Spells as cards in the overview template', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
        });

        const spellCards = element.querySelectorAll('dma-spell-card');

        expect(spellCards.length).toBe(2);
    });

    it('should not be able to request the previous page on the first page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
        });

        expect(element.querySelector('button.previous-btn').getAttribute('disabled')).toBe('');
    });

    it('should not be able to request the next page on the last page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: false,
            last: true,
        });

        expect(element.querySelector('button.next-btn').getAttribute('disabled')).toBe('');
    });

    it('should get the page number from the route', () => {
        initialize(
            {
                content: [mockSpell1, mockSpell2],
                first: false,
                last: true,
            },
            2,
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
            },
            1,
        );

        const previousBtn = element.querySelector('button.previous-btn');

        expect(previousBtn.getAttribute('disabled')).toBe(null);

        dispatchEvent(previousBtn, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseApiUrl}/spell`).flush({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
        });
        fixture.detectChanges();

        expect(previousBtn.getAttribute('disabled')).toBe('');
    });

    it('should be able to request the next page when not on the last page', () => {
        initialize({
            content: [mockSpell1, mockSpell2],
            first: true,
            last: false,
        });

        const nextBtn = element.querySelector('button.next-btn');

        expect(nextBtn.getAttribute('disabled')).toBe(null);

        dispatchEvent(nextBtn, new MouseEvent('click'));
        fixture.detectChanges();

        httpTestingController.expectOne(`${environment.baseApiUrl}/spell?page=1`).flush({
            content: [mockSpell1, mockSpell2],
            first: false,
            last: true,
        });
        fixture.detectChanges();

        expect(nextBtn.getAttribute('disabled')).toBe('');
    });
});
