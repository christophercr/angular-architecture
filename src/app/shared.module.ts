import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

// modules
import {DirectivesModule} from '@directives/directives.module';
import {PipesModule} from '@pipes/pipes.module';

const modules = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  RouterModule,
  TranslateModule,
  DirectivesModule,
  PipesModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {
}
