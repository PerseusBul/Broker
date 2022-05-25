import { Component, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { faCalendar as fasCalendar } from '@fortawesome/free-solid-svg-icons';
import { BaseField } from '../base-field';

@Component({
  selector: 'br-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'placeholder', 'validations', 'readonly'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateFieldComponent,
      multi: true
    }
  ]
})
export class DateFieldComponent extends BaseField {
  readonly fadCalendarDay = fasCalendar;

  constructor(injector: Injector) {
    super(injector);
  }
}
