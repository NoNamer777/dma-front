import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaFaIconsModule } from '@dma-core/dma-fa-icons.module';
import { DmaHeaderComponent } from './dma-header.component';

describe('DmaHeaderComponent', () => {
    let fixture: ComponentFixture<DmaHeaderComponent>;
    let windowWidthSpy: jasmine.Spy;

    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmaFaIconsModule, NoopAnimationsModule],
            declarations: [DmaHeaderComponent],
        }).compileComponents();
    });

    function initialize(mockDocumentWidth = false, width = '') {
        windowWidthSpy = spyOn(window, 'getComputedStyle').and.callThrough();

        if (mockDocumentWidth) {
            windowWidthSpy.and.returnValue({ width } as CSSStyleDeclaration);
        }
        fixture = TestBed.createComponent(DmaHeaderComponent);
        element = fixture.debugElement.nativeElement;

        fixture.detectChanges();
    }

    it('should not offset the brand on medium and larger devices', () => {
        initialize(true, '800px');

        const brand = element.querySelector('a.navbar-brand');

        expect(window.getComputedStyle(brand).transform).toBe(undefined);
    });

    it('should offset the brand on medium and smaller devices', () => {
        initialize(true, '760px');

        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();

        const brand = element.querySelector('a.navbar-brand');

        expect(window.getComputedStyle(brand).transform).not.toBe('none');
    });

    it('should toggle icons based on collapsed state', () => {
        initialize();

        expect(element.querySelector('button#collapse-button fa-icon').getAttribute('ng-reflect-icon')).toBe('bars');

        element.querySelector('button#collapse-button').dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(element.querySelector('button#collapse-button fa-icon').getAttribute('ng-reflect-icon')).toBe('times');

        element.querySelector('button#collapse-button').dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(element.querySelector('button#collapse-button fa-icon').getAttribute('ng-reflect-icon')).toBe('bars');
    });
});
