import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {

  set opened(value: boolean) {
    this._opened = coerceBooleanProperty(value);
  }

  get opened(): boolean {
    return this._opened;
  }

  private _opened = false;

  toggleSidebar(): void {
    this._opened = !this._opened;
  }
}
