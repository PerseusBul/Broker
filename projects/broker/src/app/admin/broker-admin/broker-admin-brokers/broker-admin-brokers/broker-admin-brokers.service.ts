import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';
import { BrokersTableAll } from '../../broker-admin-agents/broker-admin-agents/broker-admin-agents.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerAdminBrokersService {
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
    let length = AGENTS_DATA.length;
    let brokers = AGENTS_DATA.map((a) => new Sample(a));

    // if (params.firstName && params.firstName?.length > 0) {
    //   brokers = brokers.filter((b) => b.firstName.includes(params.firstName!));
    //   length = brokers.length;
    // }

    // if (params.middleName && params.middleName?.length > 0) {
    //   brokers = brokers.filter((b) => b.middleName.includes(params.middleName!));
    //   length = brokers.length;
    // }

    // if (params.lastName && params.lastName?.length > 0) {
    //   brokers = brokers.filter((b) => b.lastName.includes(params.lastName!));
    //   length = brokers.length;
    // }

    // if (params.fullName && params.fullName?.length > 0) {
    //   brokers = brokers.filter((b) => b.fullName.includes(params.fullName!));
    //   length = brokers.length;
    // }
    const offset = params.offset ?? 0;
    const limit = params.limit ?? 15;
    return of({ result: brokers, length: length } as BrokersTableAll);
  }
}
