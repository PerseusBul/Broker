import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { symbolRegex } from '../utils/various';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    if (!symbolRegex.test(password)) {
      return { hasSymbol: true };
    }

    if (!/[A-ZА-Я]+/.test(password)) {
      return { hasUppercaseLetter: true };
    }

    if (!/[a-zа-я]+/.test(password)) {
      return { hasLowercaseLetter: true };
    }

    if (!/[0-9]+/.test(password)) {
      return { hasNumber: true };
    }

    if (/[\s]+/.test(password)) {
      return { hasWhitespace: true };
    }

    return null;
  };
}
