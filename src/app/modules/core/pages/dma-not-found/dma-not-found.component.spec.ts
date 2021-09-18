import { Component, DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaNotFoundComponent, REDIRECTED_MESSAGE, DIRECTED_MESSAGE } from './dma-not-found.component';

describe('DmaNotFoundComponent', () => {
    let fixture: ComponentFixture<DmaCenterMockComponent>;
    let router: Router;

    let component: DmaNotFoundComponent;
    let element: HTMLElement;

    function getDebugElement<T>(componentType: Type<T>): DebugElement {
        return fixture.debugElement.query(By.directive(componentType));
    }

    @Component({
        selector: 'dma-home-mock',
        template: '<p>dma-home-mock works!</p>',
    })
    class DmaHomeMockComponent {}

    @Component({
        selector: 'dma-center-mock',
        template: `<div>
            <router-outlet></router-outlet>
        </div> `,
    })
    class DmaCenterMockComponent {}

    const routesMock: Routes = [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
        },
        {
            path: 'home',
            component: DmaHomeMockComponent,
        },
        {
            path: 'not-found',
            component: DmaNotFoundComponent,
        },
        {
            path: '**',
            redirectTo: 'not-found',
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routesMock)],
            declarations: [DmaNotFoundComponent, DmaCenterMockComponent, DmaHomeMockComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(DmaCenterMockComponent);

        fixture.detectChanges();
    });

    it('should redirect unkown routes to not-found page', async () => {
        await router.navigate(['test-url']);

        fixture.detectChanges();

        element = getDebugElement(DmaNotFoundComponent).nativeElement;

        expect(router.url).toContain('not-found');
        expect(element.querySelector('#message').textContent).toContain(REDIRECTED_MESSAGE);
        expect(element.querySelector('.fw-bold')).not.toBeNull();
    });

    it('should not show the redirected url when navigating to the not-found url', async () => {
        await router.navigate(['not-found']);

        spyOnProperty(getDebugElement(DmaNotFoundComponent).componentInstance, 'url').and.returnValue(null);

        fixture.detectChanges();

        element = getDebugElement(DmaNotFoundComponent).nativeElement;

        expect(element.querySelector('#message').textContent).toContain(DIRECTED_MESSAGE);
        expect(element.querySelector('.fw-bold')).toBeNull();
    });
});
