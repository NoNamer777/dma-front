import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { DmaSidebarService } from '@dma-core';
import { dispatchMouseEvent } from 'testing/fake-events';
import { DmaHeaderComponent } from './dma-header.component';

describe('DmaHeaderComponent', () => {
    let fixture: ComponentFixture<DmaHeaderComponent>;
    let windowWidthSpy: jasmine.Spy;

    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule, NoopAnimationsModule, RouterTestingModule],
            declarations: [DmaHeaderComponent],
        }).compileComponents();
    });

    function initialize(mockDocumentWidth = false, width = '') {
        windowWidthSpy = spyOn(window, 'getComputedStyle').and.callThrough();

        if (mockDocumentWidth) {
            windowWidthSpy.and.returnValue({ width } as CSSStyleDeclaration);
        }
        fixture = TestBed.createComponent(DmaHeaderComponent);
        element = fixture.nativeElement;

        fixture.detectChanges();
    }

    it('should not offset the brand on medium and larger devices', () => {
        initialize(true, '800px');

        const brand = element.querySelector('a.navbar-brand');

        expect(window.getComputedStyle(brand).transform).toBe(undefined);
    });

    it('should offset the brand on medium and smaller devices', () => {
        initialize(true, '760px');

        window.dispatchEvent(new UIEvent('resize'));
        fixture.detectChanges();

        const brand = element.querySelector('a.navbar-brand');

        expect(window.getComputedStyle(brand).transform).not.toBe('none');
    });

    it('should toggle icons based on collapsed state', () => {
        initialize();

        const button = element.querySelector('button#collapse-button');
        const buttonIcon = element.querySelector('button#collapse-button fa-icon');

        expect(buttonIcon.getAttribute('ng-reflect-icon')).toBe('bars');

        dispatchMouseEvent(button, 'click');
        fixture.detectChanges();

        expect(buttonIcon.getAttribute('ng-reflect-icon')).toBe('times');

        dispatchMouseEvent(button, 'click');
        fixture.detectChanges();

        expect(buttonIcon.getAttribute('ng-reflect-icon')).toBe('bars');
    });

    it('should not toggle the sidebar when logo is clicked, the sidebar is closed and not collapsable', inject(
        [DmaSidebarService],
        (sidebarService: DmaSidebarService) => {
            initialize(true, '800px');

            spyOn(sidebarService.sidebarOpenedChange$, 'next');
            const brand = element.querySelector('a.navbar-brand');

            dispatchMouseEvent(brand, 'click');
            fixture.detectChanges();

            expect(sidebarService.sidebarOpenedChange$.next).not.toHaveBeenCalled();
        },
    ));

    it('should toggle the sidebar when logo is clicked, the sidebar is opened and collapsable', inject(
        [DmaSidebarService],
        (sidebarService: DmaSidebarService) => {
            initialize(true, '760px');

            spyOn(sidebarService.sidebarOpenedChange$, 'next');
            const brand = element.querySelector('a.navbar-brand');
            const toggleBtn = element.querySelector('#collapse-button') as HTMLButtonElement;

            dispatchMouseEvent(toggleBtn, 'click');
            fixture.detectChanges();

            expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledTimes(1);

            dispatchMouseEvent(brand, 'click');
            fixture.detectChanges();

            expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledTimes(2);
        },
    ));
});
