import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faPen as fasPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { TableDataSource } from 'projects/shared/components/table/table-datasource';
import { interval, merge, of } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BrokerAdminAgentsService, BrokersTableAll } from './broker-admin-agents.service';

export interface AgentsFilter {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
}

@Component({
  selector: 'br-broker-admin-agents',
  templateUrl: './broker-admin-agents.component.html',
  styleUrls: ['./broker-admin-agents.component.scss']
})
export class BrokerAdminAgentsComponent implements OnInit {
  fasFilePrescription = fasFilePrescription;
  fadUserPlus = fadUserPlus;
  fasPen = fasPen;
  dataSource: TableDataSource<BrokersTableAll>;

  filterInUse: boolean = false;

  searchForm = this.fb.group({
    firstName: null,
    middleName: null,
    lastName: null,
    fullName: null
  });

  constructor(brokerAdminAgentsService: BrokerAdminAgentsService, private fb: FormBuilder) {
    this.dataSource = new TableDataSource<BrokersTableAll>((sortBy, sortDirection, offset, limit) =>
      merge(of(this.searchForm.value), this.searchForm.valueChanges).pipe(
        debounce(() => interval(200)),
        distinctUntilChanged(
          (value1: AgentsFilter, value2: AgentsFilter) =>
            value1.firstName === value2.firstName &&
            value1.middleName === value2.middleName &&
            value1.lastName === value2.lastName &&
            value1.fullName === value2.fullName
        ),
        switchMap((filters: { firstName?: string; middleName?: string; lastName?: string; fullName?: string }) =>
          brokerAdminAgentsService.getAll({ sortBy, sortDirection, offset, limit, ...filters })
        )
      )
    );
  }

  ngOnInit(): void {
    return;
  }

  toggleFilter() {
    this.filterInUse = !this.filterInUse;
    this.searchForm.reset();
  }
}
