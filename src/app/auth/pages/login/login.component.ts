import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {exhaustMap} from 'rxjs/operators';

// services
import {UserApi} from '@users/services/user.service';
import {Session} from '@core/session/services/session.service';

// models
import {User} from '@users/entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userApi: UserApi,
    private session: Session,
  ) {
  }

  ngOnInit() {
    this.confirmAccount();
  }

  confirmAccount() {
    if (location.pathname === '/auth/confirm-account') {
      this.activatedRoute.fragment.subscribe((fragment) => {
        if (fragment) {
          this.session.token = fragment;
          this.userApi.confirmAccount().subscribe();
        }
        this.router.navigate(['/auth/login']);
      });
    }
  }

  submit(form: Partial<User>): void {
    this.userApi.login(form).pipe(
      exhaustMap(({token, id}) => {
        this.session.token = token;
        return this.userApi.getUser(id);
      })
    ).subscribe((user) => {
      this.session.user = user;
      this.router.navigate(['/']);
    });
  }
}
