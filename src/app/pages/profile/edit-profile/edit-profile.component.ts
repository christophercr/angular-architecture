import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {exhaustMap} from 'rxjs/operators';

// services
import {UserApi} from '@services/api/user.service';
import {Session} from '@services/session.service';
import {Toast} from '@services/toast.service';

// helpers
import {filterForm} from '@helpers/form.helpers';

// models
import {User} from '@models/api/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  user: Partial<User> = {};

  constructor(
    private toast: Toast,
    private userApi: UserApi,
    private session: Session,
  ) {
  }

  ngOnInit() {
    this.userApi.getUser(this.session.user.id).subscribe(
      (user) => this.user = user
    );
  }

  submit(form: NgForm): void {
    const user: Partial<User> = filterForm(form);

    // dont send empty password
    if (user.password === '') delete user.password;

    const request = [];
    request.push(this.userApi.editUser(this.session.user.id, user));

    if (this.user.picture) {
      request.push(this.userApi.editPicture(this.session.user.id, this.user.picture));
    }

    forkJoin(request).pipe(
      exhaustMap(() =>
        this.userApi.getUser(this.session.user.id)
      )
    ).subscribe((result) => {
      this.session.user = result;
      this.user = result;
      this.toast.success('profile.messages.editionSucceed');
    });
  }
}
