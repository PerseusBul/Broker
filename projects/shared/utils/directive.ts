import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl } from '@angular/forms';

export function getFormControl(ngControl: NgControl): FormControl | null {
  if (ngControl instanceof FormControlName && ngControl.formDirective) {
    return (ngControl.formDirective as FormGroupDirective).form.get(ngControl.path) as FormControl;
  } else if (ngControl instanceof FormControlDirective) {
    return ngControl.control;
  }
  return null;
}
