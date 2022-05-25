import { Component, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseField } from '../base-field';

const TEXTAREA_MAX_SIZE = 1000;

@Component({
  selector: 'br-textarea-field',
  templateUrl: './textarea-field.component.html',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'placeholder', 'validations', 'readonly'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaFieldComponent,
      multi: true
    }
  ]
})
export class TextareaFieldComponent extends BaseField {
  readonly textareaMaxSize = TEXTAREA_MAX_SIZE;

  constructor(injector: Injector) {
    super(injector);
  }
}
