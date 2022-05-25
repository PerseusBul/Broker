import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { TableDataSource, TableResult } from 'projects/shared/components/table/table-datasource';
import { of } from 'rxjs';

type SearchParams = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  location?: string;
  address?: string;
};
//TODO: remove
export type AgentGetAll = {
  agentId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  address: string;
};

@Component({
  selector: 'br-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {
  searchForm = this.fb.group({
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    location: null,
    address: null
  });

  fadUserPlus = fadUserPlus;
  fasFilePrescription = fasFilePrescription;
  dataSource: TableDataSource<AgentGetAll>;

  constructor(private fb: FormBuilder /*, agentsService: AgentsService*/) {
    // this.dataSource = new TableDataSource<AgentGetAll>((sortBy, sortDirection, offset, limit) =>
    //   merge(of({ firstValue: true }), this.searchForm.valueChanges).pipe(
    //     debounce(({ firstValue }) => (firstValue ? interval(0) : interval(200))),
    //     distinctUntilChanged(
    //       (value1: SearchParams, value2: SearchParams) =>
    //         value1.firstName === value2.firstName &&
    //         value1.lastName === value2.lastName &&
    //         value1.phone === value2.phone &&
    //         value1.email === value2.email &&
    //         value1.location === value2.location &&
    //         value1.address === value2.address
    //     ),
    //     switchMap(
    //       (filters: {
    //         firstName?: string;
    //         lastName?: string;
    //         phone?: string;
    //         email?: string;
    //         location?: string;
    //         address?: string;
    //       }) =>
    //         agentsService.getAll({
    //           offset,
    //           limit,
    //           ...filters
    //         })
    //     )
    //   )
    // );
    this.dataSource = new TableDataSource((sortBy, sortDirection, offset, limit) => of<TableResult<never>>());
  }
}
