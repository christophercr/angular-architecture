import {NgModule} from '@angular/core';
import {MustMatchDirective} from './directives/must-match.directive';

@NgModule({
  declarations: [
    MustMatchDirective
  ],
  exports: [
    MustMatchDirective
  ],
})
export class FormModule {}
