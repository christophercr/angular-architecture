import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {EditProfileComponent} from '@pages/profile/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'edit'},
      {path: 'edit', component: EditProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
