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
  public getAll(
    sortBy: string = '',
    sortDirection: string = '',
    offset: number = 0,
    limit: number
  ): Observable<BrokersTableAll> {
    const length = AGENTS_DATA.length;
    const brokers = AGENTS_DATA.map((a) => new Sample(a)).slice(offset, offset + limit);
    console.log(sortBy);
    console.log(sortDirection);

    return of({ result: brokers, length: length } as BrokersTableAll);
  }
}
