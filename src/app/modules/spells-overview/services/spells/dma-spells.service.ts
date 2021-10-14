import { Injectable } from '@angular/core';
import { DmaApiService } from '@dma-shared';
import { Observable, tap } from 'rxjs';

import { Spell } from '@dma-shared/models/entities';
import { environment } from '../../../../../environments/environment';
import { Pageable } from '@dma-shared/models/pageable.model';

@Injectable({ providedIn: 'root' })
export class DmaSpellsService {
    spellsPage: Pageable<Spell>;

    constructor(private apiService: DmaApiService) {}

    getSpells(): Observable<Pageable<Spell>> {
        return this.apiService
            .getPageableResource<Spell>(`${environment.baseApiUrl}/spell`, 'Spell')
            .pipe(tap((spellsPage) => (this.spellsPage = spellsPage)));
    }
}
