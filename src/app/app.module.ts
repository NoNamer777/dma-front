import { NgModule } from '@angular/core';

import { CoreModule } from './modules/core';
import { SharedModule } from './modules/shared';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [CoreModule, SharedModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
