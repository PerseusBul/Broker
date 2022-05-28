import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function invoiceNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    if (!/[0-9]+/.test(password)) {
      return { invalidSymbol: true };
    }

    if (/[0-9]{10}/.test(password)) {
      return { invalidLength: true };
    }

    return null;
  };
}
