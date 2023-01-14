import {Directive, Input} from '@angular/core';
import {UntypedFormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[mustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective implements Validator {
  @Input('mustMatch') values: string[] = [];

  validate(formGroup: UntypedFormGroup): ValidationErrors {
    return this.mustMatch(this.values[0], this.values[1])(formGroup);
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // return null if controls haven't initialised yet
      if (!control || !matchingControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      if ([undefined, ''].includes(control.value) && [undefined, ''].includes(matchingControl.value)) {
        // don't send error if inputs are empty
        matchingControl.setErrors(null);
      } else if (control.value !== matchingControl.value) {
        // set error on matchingControl if validation fails
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
