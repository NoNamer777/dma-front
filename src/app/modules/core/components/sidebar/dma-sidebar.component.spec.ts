import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaSidebarService } from '@dma-core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { dispatchMouseEvent } from 'src/testing/fake-events';
import { DmaSidebarComponent } from './dma-sidebar.component';

describe('DmaSidebarComponent', () => {
    let fixture: ComponentFixture<DmaSidebarComponent>;

    let element: HTMLElement;

    let sidebarService: DmaSidebarService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule, NoopAnimationsModule, RouterTestingModule],
            declarations: [DmaSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        sidebarService = TestBed.inject(DmaSidebarService);

        fixture = TestBed.createComponent(DmaSidebarComponent);
        element = fixture.nativeElement;

        spyOnProperty(sidebarService, 'collapsed').and.returnValue(false);
        spyOn(sidebarService, 'toggle');
    });

    it('should toggle the sidebar when clicking on an anchor element within the sidebar', () => {
        const anchor = element.querySelector('a');

        dispatchMouseEvent(anchor, 'click');
        fixture.detectChanges();

        expect(sidebarService.toggle).toHaveBeenCalled();
    });

    it('should not toggle the sidebar when the clicked target is not an anchor', () => {
        const asideElement = element.querySelector('aside');

        dispatchMouseEvent(asideElement, 'click');
        fixture.detectChanges();

        expect(sidebarService.toggle).not.toHaveBeenCalled();
    });
});
