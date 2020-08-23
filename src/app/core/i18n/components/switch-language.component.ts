import {Component} from '@angular/core';

// services
import {Translate} from '@core/i18n/services/translate.service';

@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html'
})
export class SwitchLanguageComponent {

  constructor(
    public translate: Translate,
  ) {
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
