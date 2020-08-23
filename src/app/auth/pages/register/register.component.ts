import {Component} from '@angular/core';
import {Router} from '@angular/router';

// services
import {UserApi} from '@users/services/user.service';
import {Toast} from '@shared/toast/services/toast.service';

// models
import {User} from '@users/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private toast: Toast,
    private userApi: UserApi,
  ) {
  }

  submit(form: Partial<User>): void {
    this.userApi.register(form).subscribe(() => {
      this.toast.success('auth.messages.registered');
      this.router.navigate(['/auth/login']);
    });
  }
}
