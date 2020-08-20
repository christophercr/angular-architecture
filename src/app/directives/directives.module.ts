import {NgModule} from '@angular/core';

// pipes
import {ModalHostDirective} from '@directives/modal-host.directive';
import {MustMatchDirective} from '@directives/must-match.directive';

const directives = [
  ModalHostDirective,
  MustMatchDirective,
];

@NgModule({
  declarations: directives,
  exports: directives
})
export class DirectivesModule {
}
