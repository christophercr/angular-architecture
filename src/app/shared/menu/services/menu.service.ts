import {Injectable} from '@angular/core';

// services
import {Session} from '@core/session/services/session.service';

// models
import {MenuItem} from '@shared/menu/entities/menu-item';

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
          link: ['/users', 'profile'],
          icon: 'account_circle'
        }
      ], [
        {
          name: 'menu.users',
          link: ['/users', 'list'],
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
