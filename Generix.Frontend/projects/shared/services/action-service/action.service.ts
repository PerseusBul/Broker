import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalErrorHandler } from 'projects/shared/other/global-error-handler';
import { openTypedDialog } from 'projects/shared/utils/dialog';
import { ConfirmDialogComponent, ConfirmDialogResult } from './confirm-dialog/confirm-dialog.component';
import { ErrorsDialogComponent } from './errors-dialog/errors-dialog.component';

@Injectable()
export class ActionService {
  constructor(private dialog: MatDialog) {}

  execute(options: {
    confirmMessage?: string | null;
    errorsMessage?: string;
    httpAction: () => Promise<void>;
  }): Promise<boolean> {
    let confirmPromise: Promise<boolean | void>;
    if (options.confirmMessage) {
      confirmPromise = openTypedDialog(this.dialog, ConfirmDialogComponent, {
        data: { message: options.confirmMessage }
      })
        .afterClosed()
        .toPromise()
        .then((result) => result === ConfirmDialogResult.Ok)
        .catch(GlobalErrorHandler.instance.handleError);
    } else {
      confirmPromise = Promise.resolve(true);
    }

    return confirmPromise.then((confirmed) => {
      if (confirmed) {
        return options.httpAction().then(
          () => true, // success
          (resp: HttpErrorResponse) => {
            if (resp.status === 400 && resp.error?.errorMessages?.length > 0) {
              openTypedDialog(this.dialog, ErrorsDialogComponent, {
                data: {
                  header: options.errorsMessage || 'Възникнаха следните валидационни грешки:',
                  errorMessages: resp.error.errorMessages
                }
              });
            } else {
              openTypedDialog(this.dialog, ConfirmDialogComponent, {
                data: {
                  message: 'Възникна непредвидена грешка! Моля, презаредете страницата и опитайте отново.',
                  okBtnHidden: true,
                  cancelBtnText: 'OK'
                }
              });

              GlobalErrorHandler.instance.handleError(resp, true);
            }

            return false; // an error ocurred
          }
        );
      }

      return Promise.resolve(false); // the user canceled the action
    });
  }
}
