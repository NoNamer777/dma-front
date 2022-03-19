import { Component } from '@angular/core';
import { DmaTitleService } from '@dma-shared';

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
