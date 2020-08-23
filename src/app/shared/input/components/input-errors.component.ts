import {Component, Input} from '@angular/core';
import {NgModel, ValidationErrors} from '@angular/forms';

// services
import {Translate} from '@core/i18n/services/translate.service';

// config
import {REGEX} from '@config/regex';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html'
})
export class InputErrorsComponent {
  @Input() input: NgModel;

  constructor(
    private translate: Translate
  ) {
  }

  formatErrors(errors: ValidationErrors): string[] {
    return Object.keys(errors).map((key) =>
      this.formatError(key, errors[key])
    );
  }

  private formatError(errorKey: string, error: any): string {
    switch (errorKey) {
      case 'required':
        return this.translate.instant('errors.form.required');
      case 'minlength':
        return this.translate.instant('errors.form.minLength', {width: error.requiredLength});
      case 'maxlength':
        return this.translate.instant('errors.form.maxLength', {width: error.requiredLength});
      case 'mustMatch':
        return this.translate.instant('errors.form.mustMatch');
      case 'pattern':
        return this.formatErrorPattern(error.requiredPattern);
      default:
        return this.translate.instant('errors.form.default');
    }
  }

  private formatErrorPattern(pattern: RegExp): string {
    const keyFound = Object.keys(REGEX).find((key) =>
      REGEX[key].toString() === pattern.toString()
    );

    if (keyFound) return this.translate.instant('errors.form.regex_' + keyFound);

    return this.translate.instant('errors.form.default');
  }
}
