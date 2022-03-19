import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { DmaPrivacyPolicyComponent } from '@dma-core/pages/privacy-policy/dma-privacy-policy.component';
import { environment } from '@dma-environment';
import { DmaTitleService } from '@dma-shared';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('DmaPrivacyPolicyComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeTestingModule],
            declarations: [DmaPrivacyPolicyComponent],
        }).compileComponents();
    });

    it('should set the title of the page', inject([Title, DmaTitleService], (titleService: Title) => {
        const fixture = TestBed.createComponent(DmaPrivacyPolicyComponent);

        fixture.detectChanges();

        expect(titleService.getTitle()).toBe(environment.baseTitle + ' - Privacy Policy');
    }));
});
