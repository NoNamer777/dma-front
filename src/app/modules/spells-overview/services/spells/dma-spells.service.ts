import { Injectable } from '@angular/core';
import { environment } from '@dma-environment/environment';
import { DmaApiService, Pageable, SpellModel } from '@dma-shared';
import { Observable, tap } from 'rxjs';

export interface SpellRequestOptions {
    name?: string;
    page?: number;

    [option: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class DmaSpellsService {
    /** The current page with Spells. */
    spellsPage: Pageable<SpellModel>;

    constructor(private apiService: DmaApiService) {}

    /**
     * Sends a GET request to get a page of Spells.
     * Optionally requests a specific page of Spells.
     */
    getSpells(options: SpellRequestOptions = {}): Observable<Pageable<SpellModel>> {
        return this.apiService
            .getPageableResource<SpellModel>(this.buildRequestUrl(options), 'Spell')
            .pipe(tap((spellsPage) => (this.spellsPage = spellsPage)));
    }

    private buildRequestUrl(options: SpellRequestOptions): string {
        let url = `${environment.baseServerUrl}/api/spell`;

        for (const option in options) {
            if (options[option] === null) continue;
            if (option === 'page' && options[option] === 0) continue;
            if (option === 'name' && options[option] === '') continue;
            if (!url.includes('?')) url += '?';
            if (!url.endsWith('?')) url += '&';

            url += `${option}=${options[option]}`;
        }

        return url;
    }
}
