import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {prop} from 'ramda';

// services
import {Storage} from '@core/storage/services/storage.service';

// models
import {Role, User} from '@users/entities/user';

@Injectable({
  providedIn: 'root'
})
export class Session {

  constructor(
    private router: Router,
    private storage: Storage,
  ) {
  }

  get user(): Partial<User> {
    return this.storage.get('user');
  }

  set user(user: Partial<User>) {
    this.storage.set('user', user);
  }

  get token(): string {
    return this.storage.get('token');
  }

  set token(token: string) {
    this.storage.set('token', token);
  }

  isConnected(): boolean {
    return Boolean(this.token && prop('id', this.user));
  }

  isAdmin(): boolean {
    return prop('role', this.user) === Role.ADMIN;
  }

  logout(): void {
    this.storage.clear();
    this.router.navigate(['/auth']);
  }
}
