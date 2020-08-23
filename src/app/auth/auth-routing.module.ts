import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {EditPasswordComponent} from '@auth/pages/edit-password/edit-password.component';
import {ForgotPasswordComponent} from '@auth/pages/forgot-password/forgot-password.component';
import {LoginComponent} from '@auth/pages/login/login.component';
import {RegisterComponent} from '@auth/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'confirm-account', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'edit-password', component: EditPasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
