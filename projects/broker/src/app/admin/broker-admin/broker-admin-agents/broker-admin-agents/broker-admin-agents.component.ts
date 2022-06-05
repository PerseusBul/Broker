import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { TableDataSource } from 'projects/shared/components/table/table-datasource';
import { BrokerAdminAgentsService, BrokersTableAll } from './broker-admin-agents.service';

@Component({
  selector: 'br-broker-admin-agents',
  templateUrl: './broker-admin-agents.component.html',
  styleUrls: ['./broker-admin-agents.component.scss']
})
export class BrokerAdminAgentsComponent implements OnInit {
  //, AfterViewInit
  fasFilePrescription = fasFilePrescription;
  fadUserPlus = fadUserPlus;
  // dataSource = new MatTableDataSource<Sample>(AGENTS_DATA.map((a) => new Sample(a)));
  dataSource: TableDataSource<BrokersTableAll>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brokerAdminAgentsService: BrokerAdminAgentsService) {
    this.dataSource = new TableDataSource((sortBy, sortDirection, offset, limit) =>
      brokerAdminAgentsService.getAll(sortBy, sortDirection, offset, limit || 15)
    );
  }

  ngOnInit(): void {
    return;
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}
