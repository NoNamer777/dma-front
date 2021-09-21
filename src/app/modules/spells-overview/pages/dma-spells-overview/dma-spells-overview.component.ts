import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DmaSpellsService } from '@dma-spells-overview';

@Component({
    selector: 'dma-spells-overview',
    templateUrl: './dma-spells-overview.component.html',
    styleUrls: ['./dma-spells-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaSpellsOverviewComponent implements OnInit {
    waitingForResponse = false;

    constructor(public spellsService: DmaSpellsService, private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.waitingForResponse = true;

        this.spellsService.getSpells().subscribe(() => {
            this.waitingForResponse = false;
            this.changeDetectorRef.markForCheck();
        });
    }
}
