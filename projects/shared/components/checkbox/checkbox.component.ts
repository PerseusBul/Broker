import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseField } from '../base-field';

export type LabelPositionType = 'before' | 'after';
export type ErrorPositionType = 'up' | 'down';
export type Label = 'before' | 'after';

@Component({
  selector: 'crm-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  inputs: ['label', 'placeholder', 'validations', 'readonly'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent extends BaseField {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() color?: string;
  @Input() ariaLabelledBy: string | null = null;
  @Input() value: string = '';
  @Input() name: string | null = null;
  @Input() class: string | string[] | Object | undefined;
  @Input() errorPosition: ErrorPositionType = 'down';
  @Input() labelPosition: LabelPositionType = 'after';
  @Output() changeEmitter = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector);
  }

  onChange($event: any) {
    this.changeEmitter.emit($event);
  }
}
