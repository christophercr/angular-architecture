import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {EditProfileComponent} from '@users/pages/edit-profile/edit-profile.component';
import {ListUsersComponent} from '@users/pages/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'list'},
      {path: 'list', component: ListUsersComponent},
      {
        path: 'profile',
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'edit'},
          {path: 'edit', component: EditProfileComponent},
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
