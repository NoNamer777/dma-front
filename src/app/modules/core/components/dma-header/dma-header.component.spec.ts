import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaFaIconsModule } from '@dma-core/dma-fa-icons.module';
import { DmaHeaderComponent } from './dma-header.component';

describe('DmaHeaderComponent', () => {
    let fixture: ComponentFixture<DmaHeaderComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmaFaIconsModule, NoopAnimationsModule],
            declarations: [DmaHeaderComponent],
        }).compileComponents();
    });

    function initialize() {
        fixture = TestBed.createComponent(DmaHeaderComponent);
        element = fixture.debugElement.nativeElement;

        fixture.detectChanges();
    }

    it('should not offset the brand on medium and larger devices', () => {
        spyOn(window, 'getComputedStyle')
            .and.callThrough()
            .withArgs(document.documentElement)
            .and.returnValue({ width: '800px' } as CSSStyleDeclaration);

        initialize();

        const brand = element.querySelector('a.navbar-brand');

        expect(window.getComputedStyle(brand).transform).toBe('none');
    });

    xit('should offset the brand on medium and smaller devices', async () => {
        spyOn(window, 'getComputedStyle')
            .and.callThrough()
            .withArgs(document.documentElement)
            .and.returnValue({ width: '760px' } as CSSStyleDeclaration);

        initialize();

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
