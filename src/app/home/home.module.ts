import {NgModule} from '@angular/core';

// modules
import {CoreModule} from '@core/core.module';
import {HomeRoutingModule} from '@home/home-routing.module';
import {SharedModule} from '@shared/shared.module';

// components
import {DemoComponent} from '@home/components/demo/demo.component';
import {HomeComponent} from '@home/pages/home/home.component';

@NgModule({
  declarations: [
    DemoComponent,
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class HomeModule {
}
