import { inject, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { environment } from '@dma-environment';
import { DmaTitleService } from './dma-title.service';

describe('TitleService', () => {
    let titleService: DmaTitleService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        titleService = TestBed.inject(DmaTitleService);
    });

    it('should set the page Title', inject([Title], (title: Title) => {
        titleService.pageTitle = ' - my title';

        expect(title.getTitle()).toBe(environment.baseTitle + ' - my title');
    }));
});
