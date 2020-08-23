import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

import {Translate} from '@core/i18n/services/translate.service';

@Pipe({
  name: 'dateLocale',
  pure: false
})
export class DateLocalePipe implements PipeTransform {

  constructor(
    private translate: Translate,
  ) {
  }

  transform(value: any, format?: string) {
    const datePipe: DatePipe = new DatePipe(this.translate.currentLang);
    return datePipe.transform(value, format);
  }
}
