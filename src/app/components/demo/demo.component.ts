import {Component} from '@angular/core';

// services
import {UserApi} from '@services/api/user.service';
import {Modal} from '@services/modal.service';
import {Toast} from '@services/toast.service';

// components
import {SwitchLanguageComponent} from '@components/switch-language/switch-language.component';

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
