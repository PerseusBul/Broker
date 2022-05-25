import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
// if we use only types from this import typescript will not import it in the bundle
// !!DO NOT access anything other than types from this 'StackTrace' import!!
import * as StackTrace from 'stacktrace-js';

export class GlobalErrorHandler implements ErrorHandler {
  static instance = new GlobalErrorHandler();

  private StackTracePromise: Promise<typeof StackTrace>;

  constructor() {
    this.StackTracePromise = import('stacktrace-js');
  }

  handleError(error: any): void;
  handleError(error: any, presented: boolean): void;
  handleError(error: any, presented?: boolean): void {
    try {
      if (!presented) {
        // create an EventEmitter that posts the unpresented errors
        // so that they can be presented from some UI component
      }

      if (error instanceof Error) {
        console.error(error);
        this.StackTracePromise.then((StackTrace) => {
          StackTrace.fromError(error).then((stackframes) => {
            const stackString = stackframes
              .splice(0, 20)
              .map(function (sf) {
                return sf.toString();
              })
              .join('\n');

            // TODO: send the stack trace to a logger service
            // where the trace can be enhanced with source maps
            // and logged into Loki
            console.groupCollapsed('stacktrace-js stack');
            console.log(stackString);
            console.groupEnd();
          });
        });
      } else if (error instanceof HttpErrorResponse) {
        // TODO provide a better log for http errors
        console.error(error.message);
      }
    } catch (err) {
      // this method should never throw or we can end up in an infinite loop!!!
      console.log(err);
    }
  }
}
