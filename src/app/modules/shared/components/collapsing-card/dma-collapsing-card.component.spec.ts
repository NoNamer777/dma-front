import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { dispatchEvent } from 'src/testing/fake-events';
import { DmaCollapsingCardComponent } from './dma-collapsing-card.component';

describe('DmaCollapsingCardComponent', () => {
    let fixture: ComponentFixture<CollapsingCardMockComponent>;
    let element: HTMLElement;

    @Component({
        selector: 'dma-collapsing-card-mock',
        template: `
            <dma-collapsing-card>
                <span class="dma-card-header">Card Header</span>
                <span class="dma-card-body">Card body</span>
            </dma-collapsing-card>
        `,
    })
    class CollapsingCardMockComponent {}

    @Component({
        selector: 'dma-opened-card-mock',
        template: `
            <dma-collapsing-card opened>
                <span class="dma-card-header">Card Header</span>
                <span class="dma-card-body">Card body</span>
            </dma-collapsing-card>
        `,
    })
    class OpenedCardMockComponent {}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule],
            declarations: [DmaCollapsingCardComponent, CollapsingCardMockComponent, OpenedCardMockComponent],
        }).compileComponents();
    });

    describe('regular', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(CollapsingCardMockComponent);
            element = fixture.debugElement.query(By.directive(DmaCollapsingCardComponent)).nativeElement;

            fixture.detectChanges();
        });

        it('should toggle icon when collapsing', () => {
            const toggleBtn = element.querySelector('button');
            const icon = element.querySelector('fa-icon');

            expect(icon.getAttribute('ng-reflect-icon')).toBe('chevron-down');

            dispatchEvent(toggleBtn, new MouseEvent('click'));
            fixture.detectChanges();

            expect(icon.getAttribute('ng-reflect-icon')).toBe('chevron-up');

            dispatchEvent(toggleBtn, new MouseEvent('click'));
            fixture.detectChanges();

            expect(icon.getAttribute('ng-reflect-icon')).toBe('chevron-down');
        });
    });

    describe('start opened', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OpenedCardMockComponent);
            element = fixture.debugElement.query(By.directive(DmaCollapsingCardComponent)).nativeElement;

            fixture.detectChanges();
        });

        it('should start open when input changes', () => {
            expect(element.querySelector('fa-icon').getAttribute('ng-reflect-icon')).toBe('chevron-up');
            expect(element.querySelector('#card-content-list').classList).toContain('show');
        });
    });
});
