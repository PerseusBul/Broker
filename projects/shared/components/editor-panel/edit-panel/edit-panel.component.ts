import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { faArrowLeft as fasArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faCheck as fasCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faPencilAlt as fasPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faSpinner as fasSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SaveToken } from '../editor-panel.component';

@Component({
  selector: 'br-edit-panel',
  templateUrl: './edit-panel.component.html'
})
export class EditPanelComponent implements OnChanges, OnInit, OnDestroy {
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly fasCheck = fasCheck;
  readonly fasSpinner = fasSpinner;
  readonly fasTimes = fasTimes;
  readonly fasPencilAlt = fasPencilAlt;
  readonly fasArrowLeft = fasArrowLeft;

  @Input() editBtnHidden = false;
  @Input() editBtnDisabled = false;

  @Input() backBtnHidden = false;
  @Input() backBtnDisabled = false;
  @Input() backBtnRouteCommands: any[] = ['../'];
  @Input() backBtnRouteExtras: NavigationExtras | null = null;

  @Input() editable = false;
  @Output() editableChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<SaveToken>();

  saveBtnDisabled = false;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editable'].isFirstChange()) {
      return;
    }

    if (changes['editable'].currentValue) {
      this.formGroupDirective.control.enable({ emitEvent: false });
    } else {
      this.formGroupDirective.control.disable({ emitEvent: false });
    }
  }

  ngOnInit() {
    if (!this.editable) {
      setTimeout(() => {
        this.formGroupDirective.control.disable({ emitEvent: false });
      });
    }

    this.formGroupDirective.ngSubmit.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.formGroupDirective.invalid || this.saveBtnDisabled || !this.editable) {
        return;
      }

      this.saveBtnDisabled = true;
      this.save.emit({
        done: (success: boolean) => {
          this.saveBtnDisabled = false;

          if (success) {
            this.formGroupDirective.control.disable({ emitEvent: false });
            this.setEditable(false);
          }
        }
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  cancel() {
    this.formGroupDirective.control.disable({ emitEvent: false });
    this.setEditable(false);
  }

  edit() {
    this.formGroupDirective.control.enable({ emitEvent: false });
    this.setEditable(true);
  }

  private setEditable(editable: boolean) {
    this.editable = editable;
    this.editableChange.emit(editable);
  }
}
