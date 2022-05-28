import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const repeatPassword: string = control.value;
    const password = passwordControl.value;
    if (password && repeatPassword && password !== repeatPassword) {
      return { match: true };
    }
    return null;
  };
}
