import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

// modules
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

// directives
import {MustMatchDirective} from '@shared/form/directives/must-match.directive';
import {ModalHostDirective} from '@shared/modal/directives/modal-host.directive';

// components
import {InputErrorsComponent} from '@shared/input/components/input-errors.component';
import {InputFileComponent} from '@shared/input/components/input-file.component';
import {InputLabelComponent} from '@shared/input/components/input-label.component';
import {InputComponent} from '@shared/input/components/input.component';
import {LoaderComponent} from '@shared/loader/components/loader.component';
import {MenuItemComponent} from '@shared/menu/components/menu-item.component';
import {MenuComponent} from '@shared/menu/components/menu.component';
import {ModalButtonsComponent} from '@shared/modal/components/modal-buttons.component';
import {ModalComponent} from '@shared/modal/components/modal.component';
import {TableColComponent} from '@shared/table/components/table-col.component';
import {TableComponent} from '@shared/table/components/table.component';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  InfiniteScrollModule,
  TranslateModule,
];

const directives = [
  MustMatchDirective,
  ModalHostDirective,
];

const components = [
  InputComponent,
  InputErrorsComponent,
  InputFileComponent,
  InputLabelComponent,
  LoaderComponent,
  MenuComponent,
  MenuItemComponent,
  ModalComponent,
  ModalButtonsComponent,
  TableComponent,
  TableColComponent,
];

@NgModule({
  declarations: [
    directives,
    components,
  ],
  imports: modules,
  exports: [
    ...modules,
    ...directives,
    ...components,
  ],
})
export class SharedModule {
}
