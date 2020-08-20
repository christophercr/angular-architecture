import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {EditPasswordComponent} from '@pages/auth/edit-password/edit-password.component';
import {ForgotPasswordComponent} from '@pages/auth/forgot-password/forgot-password.component';
import {LoginComponent} from '@pages/auth/login/login.component';
import {RegisterComponent} from '@pages/auth/register/register.component';

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
