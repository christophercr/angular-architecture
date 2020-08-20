import {Component, Input} from '@angular/core';

// models
import {MenuItem} from '@models/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() item: MenuItem;
}
