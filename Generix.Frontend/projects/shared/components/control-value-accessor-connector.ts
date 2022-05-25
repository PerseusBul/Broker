import { Injectable, InjectFlags, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { getFormControl } from 'projects/shared/utils/directive';
import { throwError } from 'projects/shared/utils/various';

// inspired by
// https://stackoverflow.com/a/58551853/682203

@Injectable()
export class ControlValueAccessorConnector implements ControlValueAccessor, OnInit {
  control!: FormControl;
  form!: FormGroupDirective | NgForm | null;
  errorStateMatcher!: ErrorStateMatcher;

  constructor(protected injector: Injector) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
    const parentForm = this.injector.get(NgForm, null, InjectFlags.Optional);
    const parentFormGroup = this.injector.get(FormGroupDirective, null, InjectFlags.Optional);
    this.form = parentFormGroup || parentForm;
    this.errorStateMatcher = this.injector.get(ErrorStateMatcher);
    this.control =
      getFormControl(this.injector.get(NgControl, undefined, InjectFlags.Self)) ??
      throwError('Cannot find formControl or formControlName');
  }

  // These are just to make Angular happy. Not needed since the control is passed to the child input
  writeValue(obj: any): void {}
  registerOnChange(fn: (_: any) => void): void {}
  registerOnTouched(fn: any): void {}
}
