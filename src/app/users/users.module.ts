import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@shared/shared.module';
import {UsersRoutingModule} from '@users/users-routing.module';

// components
import {SearchUsersComponent} from '@users/components/search-users/search-users.component';
import {EditProfileComponent} from '@users/pages/edit-profile/edit-profile.component';
import {ListUsersComponent} from '@users/pages/list-users/list-users.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ListUsersComponent,
    SearchUsersComponent,
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
})
export class UsersModule {
}
