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

    it('should toggle the sidebar on specific instances', () => {
        spyOn(sidebarService.sidebarOpenedChange$, 'next');

        sidebarService.toggle();

        expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledWith(true);

        sidebarService.toggle(false);

        expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledTimes(1);

        sidebarService.toggle();

        expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledTimes(2);
        expect(sidebarService.sidebarOpenedChange$.next).toHaveBeenCalledWith(false);
    });
});
