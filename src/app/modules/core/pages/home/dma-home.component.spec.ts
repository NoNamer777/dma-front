import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { environment } from '@dma-environment';
import { DmaCollapsingCardComponent, DmaTitleService } from '@dma-shared';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { DmaHomeComponent } from './dma-home.component';

describe('DmaHomeComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule],
            declarations: [DmaHomeComponent, DmaCollapsingCardComponent],
        }).compileComponents();
    });

    it('should set the title of the page', inject([Title, DmaTitleService], (titleService: Title) => {
        const fixture = TestBed.createComponent(DmaHomeComponent);

        fixture.detectChanges();

        expect(titleService.getTitle()).toBe(environment.baseTitle + ' - Home');
    }));
});
