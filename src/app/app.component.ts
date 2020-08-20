import {Component} from '@angular/core';

// env
import {environment} from '@environment';
import {version} from '../../package.json';

// services
import {UserApi} from '@services/api/user.service';
import {ErrorsHandler} from '@services/errors-handler.service';
import {Session} from '@services/session.service';
import {Sidebar} from '@services/sidebar.service';
import {Translate} from '@services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
    return `${envName} ${version}`;
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
