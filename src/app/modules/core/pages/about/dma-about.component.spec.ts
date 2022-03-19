import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { DmaAboutComponent } from '@dma-core/pages/about/dma-about.component';
import { environment } from '@dma-environment/environment';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('DmaAboutComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule],
            declarations: [DmaAboutComponent],
        }).compileComponents();
    });

    it('should set the title of the page', inject([Title, DmaTitleService], (titleService: Title) => {
        const fixture = TestBed.createComponent(DmaAboutComponent);

        fixture.detectChanges();

        expect(titleService.getTitle()).toBe(environment.baseTitle + ' - About');
    }));
});
