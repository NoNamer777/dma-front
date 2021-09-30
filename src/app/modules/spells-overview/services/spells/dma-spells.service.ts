import { Injectable } from '@angular/core';
import { DmaApiService } from '@dma-shared';
import { Observable, tap } from 'rxjs';

import { Spell } from '@dma-shared/models/entities';

@Injectable({ providedIn: 'root' })
export class DmaSpellsService {
    spells: Spell[];

    constructor(private apiService: DmaApiService) {}

    getSpells(): Observable<Spell[]> {
        return this.apiService
            .getResource<Spell[]>('assets/data/spells.json', 'Spell')
            .pipe(tap((spells) => (this.spells = spells)));
    }
}
