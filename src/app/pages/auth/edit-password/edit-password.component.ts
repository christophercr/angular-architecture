import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// services
import {UserApi} from '@services/api/user.service';
import {Session} from '@services/session.service';
import {Toast} from '@services/toast.service';

// models
import {User} from '@models/api/user';

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
