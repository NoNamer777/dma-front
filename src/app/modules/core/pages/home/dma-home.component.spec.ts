import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { DmaHomeComponent } from '@dma-core/pages/home/dma-home.component';
import { environment } from '@dma-environment/environment';
import { DmaCollapsingCardComponent } from '@dma-shared/components/collapsing-card/dma-collapsing-card.component';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

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
