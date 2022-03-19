import { NgModule } from '@angular/core';
import { DmaCoreModule } from '@dma-core';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [DmaCoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
