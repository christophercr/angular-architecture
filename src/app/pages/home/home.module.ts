import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@app/shared.module';
import {ComponentsModule} from '@components/components.module';
import {HomeRoutingModule} from '@pages/home/home-routing.module';

// components
import {HomeComponent} from '@pages/home/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class HomeModule {
}
