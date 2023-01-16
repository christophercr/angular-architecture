import {Component} from '@angular/core';

// env
import {environment} from '@environment';
import packageInfo from '../../package.json';

import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';

// services
import {ErrorsHandler} from '@core/api/services/errors-handler.service';
import {Translate} from '@core/i18n/services/translate.service';
import {Session} from '@core/session/services/session.service';
import {Sidebar} from '@shared/menu/services/sidebar.service';
import {UserApi} from '@users/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CoreModule, SharedModule]
})
export class AppComponent {
  appName: string = environment.appName;

  constructor(
    public errorsHandler: ErrorsHandler,
    public sidebar: Sidebar,
    private translate: Translate,
    private userApi: UserApi,
    public session: Session,
  ) {
    this.translate.init();

    this.getUser();
  }

  displayEnv(): string {
    const envName = environment.name === 'Production' ? environment.appName : environment.name;
    return `${envName} ${packageInfo.version}`;
  }

  // refresh user in local storage
  getUser(): void {
    if (this.session.isConnected()) {
      this.userApi.getUser(this.session.user.id).subscribe(
        (user) => this.session.user = user
      );
    }
  }
}
