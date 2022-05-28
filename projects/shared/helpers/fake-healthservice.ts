import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tr } from 'date-fns/locale';
import { GetCardDetailsResponse } from 'projects/crm-api';
import { ListContractsResponse } from 'projects/crm-api/model/listContractsResponse';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

const contracts: ListContractsResponse = {
  success: true, contracts: [{
    egn: '0000000000',
    contractNumber: '11111111111',
    insuranceCardNumber: '11111111111-1',
    insuranceNumber: '111111111111',
    insuranceStatus: 'Активна',
    insuranceStatusCode: 'A',
    insuranceType: 'Здравна застраховка',
    insuranceTypeCode: '201',
    insuredPersonName: 'Иван Димитров Петров',
    beginDate: new Date(),
    endDate: new Date(),
    packages: [{
      packageCode: 'P101',
      blockedSums: 0,
      claimSum: 0,
      limitRemainderAgr: 100,
      packageName: 'Възстановяване на лекарства',
      payAmount: 100,
      yearPayoffLimit: 200,
    }]
  }, {
    egn: '0000000000',
    contractNumber: '11111111111',
    insuranceCardNumber: '11111111111-1',
    insuranceNumber: '111111111111',
    insuranceStatus: 'Неактивна',
    insuranceStatusCode: 'F',
    insuranceType: 'Здравна застраховка',
    insuranceTypeCode: '201',
    insuredPersonName: 'Иван Димитров Петров',
    beginDate: new Date(),
    endDate: new Date(),
    packages: [{
      packageCode: 'P101',
      blockedSums: 0,
      claimSum: 0,
      limitRemainderAgr: 100,
      packageName: 'Възстановяване на лекарства',
      payAmount: 100,
      yearPayoffLimit: 200,
    }]
  }]
};

// const cardDetails: GetCardDetailsResponse{
//   "success": true,
//   "errors": [
//     {
//       "code": "string",
//       "description": "string"
//     }
//   ],
//   "insuranceCardNumber": "string",
//   "packages": [
//     {
//       "id": "string",
//       "name": "string"
//     }
//   ],
//   "user": {
//     "id": "string",
//     "email": "string",
//     "firstName": "string",
//     "middleName": "string",
//     "lastName": "string",
//     "pinType": "string",
//     "pin": "string",
//     "phoneNumber": "string",
//     "insuranceNumber": "string",
//     "insuranceCardNumber": "string",
//     "isDataPrivacyAccepted": true,
//     "isAdvertisingSubscriptionAccepted": true,
//     "areGeneralTermsAccepted": true
//   }
// }

@Injectable()
export class FakeHealtService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/health/contracts') && method === 'GET':
          return healthContracts();
        case url.includes('/health/card/details') && method === 'POST':
          return healthGetCardDetails();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function healthGetCardDetails() {
      return ok(contracts);
    }

    function healthContracts() {
      return ok(contracts);
    }

    // helper functions
    function ok(body?: object) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeHealthServiceProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeHealtService,
  multi: true
};
