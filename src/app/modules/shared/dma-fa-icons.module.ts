import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faBook,
    faChevronDown,
    faChevronUp,
    faFile,
    faHome,
    faInfoCircle,
    faSearch,
    faTimes,
    faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const icons: IconDefinition[] = [
    faBars,
    faTimes,
    faBook,
    faSearch,
    faUndo,
    faFile,
    faChevronDown,
    faChevronUp,
    faHome,
    faInfoCircle,
    faGithub,
];

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
