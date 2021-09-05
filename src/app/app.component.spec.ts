import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let app: AppComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NoopAnimationsModule],
                declarations: [AppComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);

        app = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should create an app component instance', () => {
        expect(app).not.toBeNull();
    });
});
