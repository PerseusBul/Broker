import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipPosition, TooltipTouchGestures, TooltipVisibility } from '@angular/material/tooltip';
import { faInfo as fasInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { infoIconDefaultClass, tooltipDefaultCSS } from 'projects/shared/utils/various';
import { BaseField } from '../base-field';
import { INomVO } from '../nom-select/nom-service';

@Component({
  selector: 'br-select-field',
  templateUrl: './select-field.component.html',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'placeholder', 'validations'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectFieldComponent,
      multi: true
    }
  ]
})
export class SelectFieldComponent extends BaseField {
  @Input() items: INomVO<any>[] = [];
  @Input() noDataMessage = '';
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
