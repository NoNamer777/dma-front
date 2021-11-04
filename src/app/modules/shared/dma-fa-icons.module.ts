import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBook, faFile, faSearch, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [faBars, faTimes, faBook, faSearch, faUndo, faFile];

@NgModule({
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule],
})
export class DmaFaIconsModule {
    constructor(faLibrary: FaIconLibrary, faConfig: FaConfig) {
        faLibrary.addIcons(...icons);
        faConfig.fixedWidth = true;
    }
}
