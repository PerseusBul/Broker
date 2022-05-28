import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipPosition, TooltipTouchGestures, TooltipVisibility } from '@angular/material/tooltip';
import { faInfo as fasInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { infoIconDefaultClass, tooltipDefaultCSS } from 'projects/shared/utils/various';
import { BaseField } from '../base-field';

@Component({
  selector: 'br-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  inputs: ['label', 'placeholder', 'validations', 'readonly'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordFieldComponent,
      multi: true
    }
  ]
})
export class PasswordFieldComponent extends BaseField {
  hide: boolean = true;
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

  togglePasswordVisibility() {
    if (this.hide) {
      this.hide = false;
      setTimeout(() => (this.hide = true), 1500);
    } else {
      this.hide = true;
    }
  }
}
