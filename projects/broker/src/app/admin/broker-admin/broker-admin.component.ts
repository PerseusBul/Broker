import { Component, OnInit } from '@angular/core';
import { faFileMedical as fasFileMedical } from '@fortawesome/free-solid-svg-icons/faFileMedical';
import { TabItem } from 'projects/shared/components/tabs/tab-item';

@Component({
  selector: 'br-broker-admin',
  templateUrl: './broker-admin.component.html',
  styleUrls: ['./broker-admin.component.scss']
})
export class BrokerAdminComponent implements OnInit {
  tabs: TabItem[] = [];
  fasFileMedical = fasFileMedical;

  ngOnInit(): void {
    this.tabs = [
      {
        text: 'Данни на фирмата',
        icon: fasFileMedical,
        routeCommands: ['./company-data']
      },
      {
        text: 'Офиси',
        icon: fasFileMedical,
        routeCommands: ['./offices']
      },
      {
        text: 'Брокери',
        icon: fasFileMedical,
        routeCommands: ['./brokers']
      },
      {
        text: 'Агенти',
        icon: fasFileMedical,
        routeCommands: ['./agents']
      }
    ];
  }
}
