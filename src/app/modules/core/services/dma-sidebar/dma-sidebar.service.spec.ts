import { TestBed } from '@angular/core/testing';
import { DmaSidebarService } from '@dma-core';

describe('DmaSidebarService', () => {
    let sidebarService: DmaSidebarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        sidebarService = TestBed.inject(DmaSidebarService);
    });

    it('should emit when the sidebar should change opend state when calling toggle', () => {
        spyOn(sidebarService.sidebarOpenedChange$, 'next');

        sidebarService.toggle();

        expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledWith(true);
    });

    it('should complete sidebarOpenedChange when service is destroyed', () => {
        spyOn(sidebarService.sidebarOpenedChange$, 'complete');

        sidebarService.ngOnDestroy();

        expect(sidebarService.sidebarOpenedChange$.complete).toHaveBeenCalled();
    });
});
