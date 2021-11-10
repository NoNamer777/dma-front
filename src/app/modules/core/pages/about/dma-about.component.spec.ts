import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { environment } from '../../../../../environments/environment';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';
import { DmaAboutComponent } from '@dma-core/pages/about/dma-about.component';

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
