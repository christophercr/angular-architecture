import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@app/shared.module';
import {ComponentsModule} from '@components/components.module';
import {UsersRoutingModule} from '@pages/users/users-routing.module';

// components
import {ListUsersComponent} from '@pages/users/list-users/list-users.component';
import {SearchUsersComponent} from '@pages/users/search-users/search-users.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    SearchUsersComponent,
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class UsersModule {
}
