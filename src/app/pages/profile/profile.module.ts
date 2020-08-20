import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@app/shared.module';
import {ComponentsModule} from '@components/components.module';
import {ProfileRoutingModule} from '@pages/profile/profile-routing.module';

// components
import {EditProfileComponent} from '@pages/profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    EditProfileComponent,
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class ProfileModule {
}
