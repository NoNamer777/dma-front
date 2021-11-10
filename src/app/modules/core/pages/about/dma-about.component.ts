import { Component } from '@angular/core';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';

@Component({
    selector: 'dma-about',
    templateUrl: './dma-about.component.html',
    styles: [],
})
export class DmaAboutComponent {
    constructor(titleService: DmaTitleService) {
        titleService.pageTitle = ' - About';
    }
}
