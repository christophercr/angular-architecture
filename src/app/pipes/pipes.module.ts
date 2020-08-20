import {NgModule} from '@angular/core';

// pipes
import {DateLocalePipe} from '@pipes/date-locale.pipe';

const pipes = [
  DateLocalePipe,
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class PipesModule {
}
