import { NgModule } from '@angular/core';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    faBars,
    faBook,
    faCheck,
    faChevronDown,
    faChevronUp,
    faEnvelope,
    faFile,
    faHome,
    faInfoCircle,
    faLock,
    faSearch,
    faShieldAlt,
    faTimes,
    faUndo,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

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
    faShieldAlt,
    faCheck,
    faEnvelope,
    faLock,
    faUser,
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
