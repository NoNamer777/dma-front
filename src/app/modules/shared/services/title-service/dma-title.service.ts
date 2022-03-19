import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@dma-environment';

@Injectable({ providedIn: 'any' })
export class DmaTitleService {
    constructor(private titleService: Title) {}

    set pageTitle(title: string) {
        this.titleService.setTitle(environment.baseTitle + title);
    }
}
