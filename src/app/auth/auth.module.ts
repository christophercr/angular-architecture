import {NgModule} from '@angular/core';

// modules
import {AuthRoutingModule} from '@auth/auth-routing.module';
import {SharedModule} from '@shared/shared.module';

// components
import {EditPasswordComponent} from '@auth/pages/edit-password/edit-password.component';
import {ForgotPasswordComponent} from '@auth/pages/forgot-password/forgot-password.component';
import {LoginComponent} from '@auth/pages/login/login.component';
import {RegisterComponent} from '@auth/pages/register/register.component';

@NgModule({
  declarations: [
    EditPasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule {
}
