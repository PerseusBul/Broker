import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidEGN } from '../utils/various';

export function egnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pin: string = control.value;

    if (pin) {
      const isPinValid: boolean = isValidEGN(pin);

      return isPinValid ? null : { egn: true };
    }

    return null;
  };
}
