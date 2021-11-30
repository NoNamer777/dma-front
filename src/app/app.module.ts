import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DmaCoreModule } from '@dma-core';

@NgModule({
    declarations: [AppComponent],
    imports: [DmaCoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
