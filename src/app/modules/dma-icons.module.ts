import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [
  
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
