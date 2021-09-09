import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [faBars, faTimes];

@NgModule({
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule],
})
export class DmaFaIconsModule {
    constructor(faLibrary: FaIconLibrary, faConfing: FaConfig) {
        faLibrary.addIcons(...icons);
        faConfing.fixedWidth = true;
    }
}
