import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypedDialog } from 'projects/shared/utils/dialog';

export type ConfirmDialogData = {
  message: string;
  okBtnText?: string;
  okBtnHidden?: Boolean;
  cancelBtnText?: string;
  cancelBtnHidden?: Boolean;
};

export enum ConfirmDialogResult {
  Ok = 1,
  Cancel = 2
}

@Component({
  selector: 'crm-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements TypedDialog<ConfirmDialogData, ConfirmDialogResult> {
  d!: ConfirmDialogData;
  r!: ConfirmDialogResult;

  readonly okResult = ConfirmDialogResult.Ok;
  readonly cancelResult = ConfirmDialogResult.Cancel;

  constructor(
    dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmDialogData
  ) {
    dialogRef.disableClose = !!data.cancelBtnHidden;
  }
}
