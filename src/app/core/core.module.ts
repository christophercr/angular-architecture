import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {UnavailableComponent} from '@core/api/components/unavailable.component';
import {SwitchLanguageComponent} from '@core/i18n/components/switch-language.component';
import {DateLocalePipe} from '@core/i18n/pipes/date-locale.pipe';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    DateLocalePipe,
    SwitchLanguageComponent,
    UnavailableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    DateLocalePipe,
    SwitchLanguageComponent,
    UnavailableComponent,
  ]
})
export class CoreModule {}
