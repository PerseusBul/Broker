import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidLNC } from '../utils/various';

export function lncValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pin: string = control.value;

    if (pin) {
      const isPinValid: boolean = isValidLNC(pin);

      return isPinValid ? null : { egn: true };
    }

    return null;
  };
}
