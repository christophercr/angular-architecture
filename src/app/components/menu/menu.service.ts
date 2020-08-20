import {Injectable} from '@angular/core';

// services
import {Session} from '@services/session.service';

// models
import {MenuItem} from '@models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private session: Session,
  ) {
  }

  getMenuItems(): MenuItem[][] {
    return [
      [
        {
          name: 'menu.home',
          link: ['/'],
          icon: 'dashboard'
        },
        {
          name: 'menu.profile',
          link: ['/profile'],
          icon: 'account_circle'
        }
      ], [
        {
          name: 'menu.users',
          link: ['/users'],
          icon: 'supervised_user_circle',
          disabled: !this.session.isAdmin()
        }
      ], [
        {
          name: 'menu.logout',
          icon: 'power_settings_new',
          action: () => this.session.logout()
        }
      ]
    ];
  }
}
