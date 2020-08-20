import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// services
import {Api} from '@services/api.service';

// models
import {encodeCollectionParams} from '@helpers/collection-params.helper';
import {CollectionParams} from '@models/api/collection-params';
import {User} from '@models/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(
    private api: Api
  ) {
  }

  ping(): Observable<string> {
    return this.api.get(`/ping`);
  }

  login(auth: Partial<User>): Observable<{ token: string, id: string }> {
    return this.api.post(`/auth/login`, auth);
  }

  forgotPassword(user: Partial<User>): Observable<any> {
    return this.api.post(`/auth/forgot-password`, user);
  }

  editPassword(user: Partial<User>): Observable<any> {
    return this.api.post(`/auth/forgot-password/update`, user);
  }

  register(user: Partial<User>): Observable<any> {
    return this.api.post(`/users`, user);
  }

  confirmAccount(): Observable<any> {
    return this.api.post(`/auth/confirm-account`);
  }

  getUser(id: string): Observable<User> {
    return this.api.get(`/users/${id}`);
  }

  getUsers(params?: CollectionParams): Observable<User[]> {
    return this.api.get(`/users`, encodeCollectionParams(params));
  }

  editUser(id: string, user: Partial<User>): Observable<any> {
    return this.api.patch(`/users/${id}`, user);
  }

  editPicture(id: string, picture: any): Observable<any> {
    return this.api.post(`/users/${id}/picture`, {picture}, {}, true);
  }

  deleteUser(id: string): Observable<any> {
    return this.api.delete(`/users/${id}`);
  }
}
