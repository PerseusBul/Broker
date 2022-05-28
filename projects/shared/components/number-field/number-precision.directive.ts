import { Directive, HostBinding, HostListener, Inject, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { getFormControl } from 'projects/shared/utils/directive';

@Directive({
  selector: '[crmNumberPrecision]'
})
export class NumberPrecisionDirective {
  @Input('crmNumberPrecision') precision = 0;

  constructor(@Optional() @Self() @Inject(NgControl) private ngControl: NgControl) {}

  @HostBinding('attr.inputmode') get inputmode() {
    return this.precision === 0 ? 'numeric' : 'decimal';
  }

  @HostListener('blur')
  onBlur() {
    const formControl = getFormControl(this.ngControl);

    if (!formControl) return;

    if (formControl.value == null || isNaN(formControl.value)) {
      formControl.setValue(null);
    } else {
      const stringValue = formControl.value.toFixed(this.precision);
      const roundedValue = parseFloat(stringValue);

      formControl.setValue(roundedValue);
      this.ngControl.valueAccessor?.writeValue(stringValue);
    }
  }
}
