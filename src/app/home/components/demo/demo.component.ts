import {Component} from '@angular/core';

// services
import {Modal} from '@shared/modal/services/modal.service';
import {Toast} from '@shared/toast/services/toast.service';
import {UserApi} from '@users/services/user.service';

// components
import {SwitchLanguageComponent} from '@core/i18n/components/switch-language.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {

  constructor(
    public toast: Toast,
    public modal: Modal,
    public userApi: UserApi,
  ) {
  }

  ping() {
    this.userApi.ping().subscribe(
      (result) => this.toast.success(result)
    );
  }

  openModal(isComponent: boolean = false): void {
    this.modal.open(
      {
        component: isComponent ? SwitchLanguageComponent : undefined,
        title: isComponent ? 'messages.switchLanguage' : 'Title',
        text: isComponent ? undefined : 'Text of modal',
      }
    );
  }
}
