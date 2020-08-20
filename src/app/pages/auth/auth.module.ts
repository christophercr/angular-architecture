import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@app/shared.module';
import {ComponentsModule} from '@components/components.module';
import {AuthRoutingModule} from '@pages/auth/auth-routing.module';

// components
import {EditPasswordComponent} from '@pages/auth/edit-password/edit-password.component';
import {ForgotPasswordComponent} from '@pages/auth/forgot-password/forgot-password.component';
import {LoginComponent} from '@pages/auth/login/login.component';
import {RegisterComponent} from '@pages/auth/register/register.component';

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
    ComponentsModule,
  ]
})
export class AuthModule {
}
