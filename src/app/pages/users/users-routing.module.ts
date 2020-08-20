import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {ListUsersComponent} from '@pages/users/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'list'},
      {path: 'list', component: ListUsersComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
