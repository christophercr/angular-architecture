import {NgModule} from '@angular/core';

// modules
import {SharedModule} from '@app/shared.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

// components
import {DemoComponent} from '@components/demo/demo.component';
import {InputErrorsComponent} from '@components/input/input-errors/input-errors.component';
import {InputFileComponent} from '@components/input/input-file/input-file.component';
import {InputLabelComponent} from '@components/input/input-label/input-label.component';
import {InputComponent} from '@components/input/input/input.component';
import {LoaderComponent} from '@components/loader/loader.component';
import {MenuItemComponent} from '@components/menu/menu-item/menu-item.component';
import {MenuComponent} from '@components/menu/menu.component';
import {ModalButtonsComponent} from '@components/modal-buttons/modal-buttons.component';
import {ModalComponent} from '@components/modal/modal.component';
import {SwitchLanguageComponent} from '@components/switch-language/switch-language.component';
import {TableColComponent} from '@components/table/table-col/table-col.component';
import {TableComponent} from '@components/table/table.component';
import {UnavailableComponent} from '@components/unavailable/unavailable.component';

const components = [
  DemoComponent,
  InputErrorsComponent,
  InputFileComponent,
  InputLabelComponent,
  InputComponent,
  LoaderComponent,
  MenuItemComponent,
  MenuComponent,
  ModalButtonsComponent,
  ModalComponent,
  SwitchLanguageComponent,
  TableComponent,
  TableColComponent,
  UnavailableComponent
];

@NgModule({
  imports: [
    InfiniteScrollModule,
    SharedModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentsModule {
}
