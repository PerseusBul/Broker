import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { faCheck as fasCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faSpinner as fasSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SaveToken } from '../editor-panel/editor-panel.component';

@Component({
  selector: 'card-account-act',
  templateUrl: './card-account-act.component.html',
  styleUrls: ['./card-account-act.component.scss']
})
export class CardAccountActComponent implements OnInit, OnDestroy {
  @Input() cardTitle: string = 'Форма на Аксиом';
  @Input() errors: string[] = [];
  @Input() isLogin: boolean = false;
  @Input() btnText: string = 'Запази';
  @Input() forgPassRoute: string[] = [];
  @Input() registerRoute: string[] = [];
  @Input() successMessage?: string;
  @Input() loading: boolean = true;
  @Output() save = new EventEmitter<SaveToken>();

  readonly fasSpinner = fasSpinner;
  readonly fasCheck = fasCheck;
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  disabled: boolean = false;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroupDirective.ngSubmit.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.formGroupDirective.invalid || this.disabled) {
        return;
      }

      this.disabled = true;
      this.save.emit({
        done: (success: boolean) => {
          this.disabled = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
