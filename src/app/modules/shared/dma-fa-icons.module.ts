import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBook, faTimes } from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [faBars, faTimes, faBook];

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
