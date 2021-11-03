import { Injectable } from '@angular/core';
import { DmaApiService } from '@dma-shared';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Pageable } from '@dma-shared/models/pageable.model';
import { Spell } from '@dma-shared/models/entities';

@Injectable({ providedIn: 'root' })
export class DmaSpellsService {
    /** The current page with Spells. */
    spellsPage: Pageable<Spell>;

    /** The current page number. */
    pageNumber = 0;

    constructor(private apiService: DmaApiService) {}

    /**
     * Sends a GET request to get a page of Spells.
     * Optionally requests a specific page of Spells.
     */
    getSpells(): Observable<Pageable<Spell>> {
        if (this.pageNumber === 0) {
            return this.apiService
                .getPageableResource<Spell>(`${environment.baseApiUrl}/spell`, 'Spell')
                .pipe(tap((spellsPage) => this.updateData(spellsPage)));
        }

        return this.apiService
            .getPageableResource<Spell>(`${environment.baseApiUrl}/spell?page=${this.pageNumber}`, 'Spell')
            .pipe(tap((spellsPage) => this.updateData(spellsPage)));
    }

    private updateData(spellsPage: Pageable<Spell>): void {
        this.spellsPage = spellsPage;
        this.pageNumber = spellsPage.pageable.pageNumber;
    }
}
