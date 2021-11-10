import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { DmaFaIconsModule } from '@dma-shared/dma-fa-icons.module';
import { DmaHeaderComponent } from '../header/dma-header.component';
import { DmaSidebarComponent } from '../sidebar/dma-sidebar.component';
import { DmaCenterComponent } from './dma-center.component';

describe('DmaCenterComponent', () => {
    let fixture: ComponentFixture<AppMockComponent>;
    let element: HTMLElement;

    @Component({
        selector: 'dma-center-mock',
        template: `
            <div>
                <dma-header></dma-header>
                <dma-center></dma-center>
            </div>
        `,
    })
    class AppMockComponent {}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmaFaIconsModule, MatSidenavModule, NoopAnimationsModule, RouterTestingModule],
            declarations: [AppMockComponent, DmaCenterComponent, DmaHeaderComponent, DmaSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppMockComponent);
        element = fixture.debugElement.query(By.css('dma-center')).nativeElement;

        fixture.detectChanges();
    });

    it('sidenav should not be taller than the header', async () => {
        const matSidenav: MatSidenav = fixture.debugElement.query(By.directive(MatSidenav)).componentInstance;

        matSidenav.toggle();

        fixture.detectChanges();
        await fixture.whenStable();

        const sidebarElement = element.querySelector('dma-sidebar');

        expect(sidebarElement.clientHeight).not.toBeLessThan(element.clientHeight);
    });
});
