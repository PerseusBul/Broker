import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipPosition, TooltipTouchGestures, TooltipVisibility } from '@angular/material/tooltip';
import { faInfo as fasInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { infoIconDefaultClass, tooltipDefaultCSS } from 'projects/shared/utils/various';
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
  @Input() tooltipVisibility: TooltipVisibility = 'hidden';
  @Input() tooltipContent: string = '';
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() tooltipClass: string = tooltipDefaultCSS;
  @Input() infoIconClass: string = infoIconDefaultClass;
  @Input() tooltipTouchGestures: TooltipTouchGestures = 'auto';
  @Input() tooltipHideDelay: number = 0;
  @Input() tooltipShowDelay: number = 0;
  @Input() tooltipDisabled: boolean = false;

  fasInfo = fasInfo;

  constructor(injector: Injector) {
    super(injector);
  }
}
