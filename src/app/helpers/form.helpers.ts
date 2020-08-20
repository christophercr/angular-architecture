import {NgForm} from '@angular/forms';

// filter modified values
export function filterForm(form: NgForm): object {
  return Object.keys(form.form.controls).reduce((acc, key) => {
    if (form.form.controls[key].touched) {
      acc[key] = form.form.controls[key].value;
    }
    return acc;
  }, {});
}
