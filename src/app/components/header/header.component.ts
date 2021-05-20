import { Component, EventEmitter, Output } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'dma-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent {

  @Output()
  toggleSidebar = new EventEmitter<void>();

  constructor(public sidebarService: SidebarService) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
