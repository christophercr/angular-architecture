import {Component, Input} from '@angular/core';

// models
import {MenuItem} from '@shared/menu/entities/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  linkActiveExactMatch = false;

  @Input() item: MenuItem;

  constructor() {
    this.linkActiveExactMatch = this.item && this.item.link && this.item.link.length > 1 && this.item.link[0] === '/';
  }
}
