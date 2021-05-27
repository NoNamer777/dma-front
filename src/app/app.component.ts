import { Component } from '@angular/core';

import { SessionService } from './services/session.service';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'dma-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

  constructor(public sidebarService: SidebarService, private _sessionService: SessionService) {}
}
