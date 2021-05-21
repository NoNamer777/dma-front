import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBook,
  faEdit,
  faFireAlt,
  faInfoCircle,
  faPhone,
  faSignInAlt,
  faTimes,
  faUsers,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [
  faBars,
  faTimes,
  faSignInAlt,
  faEdit,
  faUsers,
  faFireAlt,
  faBook,
  faInfoCircle,
  faPhone,
];

@NgModule({
  imports: [ FontAwesomeModule ],
  exports: [ FontAwesomeModule ],
})
export class DmaIconsModule {

  constructor(iconsLibrary: FaIconLibrary) {
    iconsLibrary.addIcons(...icons);
  }
}
