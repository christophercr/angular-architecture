import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// services
import {Session} from '@core/session/services/session.service';
import {Toast} from '@shared/toast/services/toast.service';
import {UserApi} from '@users/services/user.service';

// models
import {User} from '@users/entities/user';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html'
})
export class EditPasswordComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: Toast,
    private userApi: UserApi,
    private session: Session,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.session.token = fragment;
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  submit(form: Partial<User>): void {
    this.userApi.editPassword(form).subscribe(() => {
      this.toast.success('auth.messages.passwordEdited');
      this.router.navigate(['/auth/login']);
    });
  }
}
