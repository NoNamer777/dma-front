import { Component } from '@angular/core';

import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'dma-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

  constructor(public sidebarService: SidebarService) {}
}
