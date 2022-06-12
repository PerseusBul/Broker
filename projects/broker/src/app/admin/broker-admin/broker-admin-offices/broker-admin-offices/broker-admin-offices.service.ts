import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';
import { BrokersTableAll } from '../../broker-admin-agents/broker-admin-agents/broker-admin-agents.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerAdminOfficesService {
  public getPageData(params: {
    sortBy: string;
    sortDirection: string;
    pageIndex: number;
    pageSize: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?: string;
  }): Observable<BrokersTableAll> {
    let length = AGENTS_DATA.length;
    let brokers = AGENTS_DATA.map((a) => new Sample(a));

    if (params?.sortBy) {
      const property: 'position' | 'id' | 'firstName' | 'middleName' | 'lastName' | 'fullName' =
        params?.sortBy === 'position'
          ? 'position'
          : params?.sortBy === 'firstName'
          ? 'firstName'
          : params?.sortBy === 'middleName'
          ? 'middleName'
          : params?.sortBy === 'lastName'
          ? 'lastName'
          : params?.sortBy === 'fullName'
          ? 'fullName'
          : 'id';

      brokers = brokers.sort((a, b) => {
        if (params.sortDirection === 'asc') {
          if (a[property] < b[property]) {
            return -1;
          }
          if (a[property] > b[property]) {
            return 1;
          }
          return 0;
        } else {
          if (a[property] > b[property]) {
            return -1;
          }
          if (a[property] < b[property]) {
            return 1;
          }
          return 0;
        }
      });
    }

    if (params.firstName && params.firstName?.length > 0) {
      brokers = brokers.filter((b) => b.firstName.includes(params.firstName!));
      length = brokers.length;
    }

    if (params.middleName && params.middleName?.length > 0) {
      brokers = brokers.filter((b) => b.middleName.includes(params.middleName!));
      length = brokers.length;
    }

    if (params.lastName && params.lastName?.length > 0) {
      brokers = brokers.filter((b) => b.lastName.includes(params.lastName!));
      length = brokers.length;
    }

    if (params.fullName && params.fullName?.length > 0) {
      brokers = brokers.filter((b) => b.fullName.includes(params.fullName!));
      length = brokers.length;
    }
    return of({
      result: brokers.slice(params.pageIndex * params.pageSize, params.pageIndex * params.pageSize + params.pageSize),
      length: length
    } as BrokersTableAll);
  }
}
