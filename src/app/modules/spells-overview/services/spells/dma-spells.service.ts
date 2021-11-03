import { Injectable } from '@angular/core';
import { DmaApiService } from '@dma-shared';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Pageable } from '@dma-shared/models/pageable.model';
import { Spell } from '@dma-shared/models/entities';

export interface SpellRequestOptions {
    name?: string;
    page?: number;

    [option: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class DmaSpellsService {
    /** The current page with Spells. */
    spellsPage: Pageable<Spell>;

    constructor(private apiService: DmaApiService) {}

    /**
     * Sends a GET request to get a page of Spells.
     * Optionally requests a specific page of Spells.
     */
    getSpells(options: SpellRequestOptions = {}): Observable<Pageable<Spell>> {
        return this.apiService
            .getPageableResource<Spell>(this.buildRequestUrl(options), 'Spell')
            .pipe(tap((spellsPage) => (this.spellsPage = spellsPage)));
    }

    private buildRequestUrl(options: SpellRequestOptions): string {
        let url = `${environment.baseUrl}/api/spell`;

        for (const option in options) {
            if (options[option] === null) continue;
            if (!url.includes('?')) {
                url += '?';
            }
            if (!url.endsWith('?')) {
                url += '&';
            }
            url += `${option}=${options[option]}`;
        }

        return url;
    }
}
