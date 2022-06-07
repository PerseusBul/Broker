import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';

export interface BrokersTableAll {
  result: Array<Sample>;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class BrokerAdminAgentsService {
  public getAll(params: {
    sortBy: string;
    sortDirection: string;
    offset: number;
    limit?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?: string;
  }): Observable<BrokersTableAll> {
    const length = AGENTS_DATA.length;
    let brokers = AGENTS_DATA.map((a) => new Sample(a));

    if (params.firstName && params.firstName?.length > 0) {
      brokers = brokers.filter((b) => b.firstName.includes(params.firstName!));
    }

    if (params.middleName && params.middleName?.length > 0) {
      brokers = brokers.filter((b) => b.middleName.includes(params.middleName!));
    }

    if (params.lastName && params.lastName?.length > 0) {
      brokers = brokers.filter((b) => b.lastName.includes(params.lastName!));
    }

    if (params.fullName && params.fullName?.length > 0) {
      brokers = brokers.filter((b) => b.fullName.includes(params.fullName!));
    }
    const offset = params.offset ?? 0;
    const limit = params.limit ?? 15;
    return of({ result: brokers.slice(offset, offset + limit), length: length } as BrokersTableAll);
  }
}
