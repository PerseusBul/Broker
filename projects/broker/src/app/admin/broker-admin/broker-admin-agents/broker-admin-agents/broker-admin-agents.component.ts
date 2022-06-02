import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';

@Component({
  selector: 'br-broker-admin-agents',
  templateUrl: './broker-admin-agents.component.html',
  styleUrls: ['./broker-admin-agents.component.scss']
})
export class BrokerAdminAgentsComponent implements OnInit, AfterViewInit {
  fasFilePrescription = fasFilePrescription;
  fadUserPlus = fadUserPlus;
  dataSource = new MatTableDataSource<Sample>(AGENTS_DATA.map((a) => new Sample(a)));

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
