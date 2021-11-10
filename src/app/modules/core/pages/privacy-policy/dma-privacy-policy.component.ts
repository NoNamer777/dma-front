import { Component } from '@angular/core';
import { DmaTitleService } from '@dma-shared/services/title-service/dma-title.service';

@Component({
    selector: 'dma-privacy-policy',
    templateUrl: './dma-privacy-policy.component.html',
    styles: [],
})
export class DmaPrivacyPolicyComponent {
    constructor(titleService: DmaTitleService) {
        titleService.pageTitle = ' - Privacy Policy';
    }
}
