import { Component, OnInit } from '@angular/core';
import { faImagePortrait as fasImagePortrait } from '@fortawesome/free-solid-svg-icons/faImagePortrait';
import { faLaptopFile as fasLaptopFile } from '@fortawesome/free-solid-svg-icons/faLaptopFile';
import { faMapLocationDot as fasMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { faUserTie as fasUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { TabItem } from 'projects/shared/components/tabs/tab-item';

@Component({
  selector: 'br-broker-admin',
  templateUrl: './broker-admin.component.html',
  styleUrls: ['./broker-admin.component.scss']
})
export class BrokerAdminComponent implements OnInit {
  tabs: TabItem[] = [];

  ngOnInit(): void {
    this.tabs = [
      {
        text: 'Региони',
        icon: fasMapLocationDot,
        routeCommands: ['./regions']
      },
      {
        text: 'Офиси',
        icon: fasLaptopFile,
        routeCommands: ['./offices']
      },
      {
        text: 'Посредници',
        icon: fasUserTie,
        routeCommands: ['./agents']
      },
      {
        text: 'Потребители',
        icon: fasImagePortrait,
        routeCommands: ['./users']
      }
    ];
  }
}
