import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AxiomError } from 'projects/broker-api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';
import { AuthenticationService } from '../../broker/src/app/_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private messengerService: MessengerService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 400:
            // handle validation error
            // TODO: Will we keep logic this way?
            let validationErrors = err?.error?.errors;
            for (var fieldName in validationErrors) {
              if (validationErrors.hasOwnProperty(fieldName)) {
                this.messengerService.add(new Message(`${validationErrors[fieldName]}`, false));
              }
            }
            break;
          case 401:
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            const loginErrors = err?.error?.errors as Array<AxiomError>;

            if (loginErrors) {
              loginErrors.forEach((loginError) => {
                if (loginError.description) {
                  this.messengerService.add(new Message(loginError.description, false));
                }
              });
            }
            return throwError(() => new Error('Неуспешен вход'));
          case 403:
            this.messengerService.add(new Message('Нямате права да извършите това действие!', false));
            break;

          case 404:
            // TODO: Maybe redirect to not found page
            this.messengerService.add(
              new Message('Обектът не може да бъде намерен! Моля, презаредете страницата и опитайте отново.', false)
            );
            break;

          case 409:
            this.messengerService.add(
              new Message(
                'Обектът който се опитахте да запишете е бил променен! Моля, презаредете страницата и опитайте отново.',
                false
              )
            );
            break;

          case 412:
            // TODO: Find proper message
            this.messengerService.add(new Message('Възникна непредвидена грешка! Моля, опитайте отново!', false));
            break;

          case 423:
            this.messengerService.add(new Message('Нямате права да достъпвате тази страница!', false));
            break;

          case 500:
            this.router.navigate(['./error'], {
              queryParams: {
                message:
                  'Възникна непредвидена грешка! Извиняваме се за причиненото неудобство. Моля, опитайте отново след малко или се свържете с офиса на застрахователно дружество "Аксиом".'
              }
            });
            break;

          case 503:
            this.messengerService.add(
              new Message(
                'Системата е в процес на обновяване. Извиняваме се за причиненото неудобство. Моля, опитайте отново след малко.',
                false
              )
            );
            break;

          default:
            throw new Error('Възникна непредвидена грешка! Моля, опитайте отново!');
        }

        // TODO: Will we keep logic this way?
        const error = err.error?.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
