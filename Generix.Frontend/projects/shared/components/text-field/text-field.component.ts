import { Component, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseField } from '../base-field';

@Component({
  selector: 'br-text-field',
  templateUrl: './text-field.component.html',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'placeholder', 'validations', 'readonly'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true
    }
  ]
})
export class TextFieldComponent extends BaseField {
  constructor(injector: Injector) {
    super(injector);
  }
}
