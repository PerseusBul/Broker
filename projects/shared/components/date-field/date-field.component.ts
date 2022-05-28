import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipPosition, TooltipTouchGestures } from '@angular/material/tooltip';
import { faCalendar as fasCalendar } from '@fortawesome/free-solid-svg-icons';
import { infoIconDefaultClass, tooltipDefaultCSS } from 'projects/shared/utils/various';
import { BaseField } from '../base-field';

@Component({
  selector: 'crm-date-field',
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
  @Input() minDate: Date = new Date(1900, 0, 1);
  @Input() maxDate: Date = new Date(2100, 0, 1);
  @Input() tooltipContent: string = '';
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() tooltipClass: string = tooltipDefaultCSS;
  @Input() infoIconClass: string = infoIconDefaultClass;
  @Input() tooltipTouchGestures: TooltipTouchGestures = 'auto';
  @Input() tooltipHideDelay: number = 0;
  @Input() tooltipShowDelay: number = 0;
  @Input() tooltipDisabled: boolean = false;
  readonly fadCalendarDay = fasCalendar;

  constructor(injector: Injector) {
    super(injector);
  }
}
