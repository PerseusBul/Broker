import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { faSpinner as fasSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'br-claim-registry-request-card',
  templateUrl: './claim-registry-request-card.component.html',
  styleUrls: ['./claim-registry-request-card.component.scss']
})
export class ClaimRegistryRequestCardComponent implements OnInit, OnDestroy {
  @Input() loading: boolean = true;
  @Input() btnText: string = 'Заяви';

  disabled: boolean = false;
  readonly fasSpinner = fasSpinner;
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formGroupDirective.ngSubmit.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.formGroupDirective.invalid || this.disabled) {
        return;
      }

      this.disabled = true;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
