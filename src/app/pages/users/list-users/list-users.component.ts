import {Component, ElementRef, ViewChild} from '@angular/core';

// services
import {UserApi} from '@services/api/user.service';
import {Modal} from '@services/modal.service';
import {Search} from '@services/search.service';
import {Session} from '@services/session.service';
import {Toast} from '@services/toast.service';

// models
import {CollectionParams} from '@models/api/collection-params';
import {User} from '@models/api/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html'
})
export class ListUsersComponent {
  @ViewChild('scrollContainer', {static: true}) scrollContainerRef: ElementRef;
  users: User[] = [];

  constructor(
    private toast: Toast,
    private modal: Modal,
    private search: Search,
    private userApi: UserApi,
    public session: Session,
  ) {
    // default order
    this.search.params.order = ['firstName'];
  }

  loadUsers(params: CollectionParams): void {
    this.userApi.getUsers(params).subscribe((users) =>
      this.users = this.search.handleResult(this.users, users)
    );
  }

  banUser(user: User): void {
    const isBanned = user.isBanned ? 0 : 1;

    this.userApi.editUser(user.id, {isBanned}).subscribe(() => {
      user.isBanned = isBanned;
      this.toast.success(
        isBanned ? 'users.messages.userBanned' : 'users.messages.userUnbanned',
        this.getUserName(user)
      );
    });
  }

  confirmDeleteUser(user: User, index: number): void {
    this.modal.open({
      title: 'users.deleteUser',
      text: 'users.messages.confirmDeleteUser',
      data: this.getUserName(user),
      primaryButton: {
        name: 'actions.delete',
        action: () => this.deleteUser(user, index)
      }
    });
  }

  deleteUser(user: User, index: number): void {
    this.userApi.deleteUser(user.id).subscribe(() => {
      this.users.splice(index, 1);
      this.toast.success('users.messages.userDeleted', this.getUserName(user));
    });
  }

  getStatus(user: User): string {
    if (user.isBanned) return 'error';
    if (!user.isEmailConfirmed) return 'warning';
    return 'success';
  }

  private getUserName(user: User): Pick<User, 'firstName' | 'lastName'> {
    return {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    };
  }
}
