import { Component, OnInit } from '@angular/core';
import { faHouseFire as fasHouseFire } from '@fortawesome/free-solid-svg-icons/faHouseFire';
import { faPersonHiking as fasPersonHiking } from '@fortawesome/free-solid-svg-icons/faPersonHiking';
import { faPlaneDeparture as fasPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';
//import { faFileMedical as fasFileMedical } from '@fortawesome/free-solid-svg-icons/faFileMedical';
import { faSatelliteDish as fasSatelliteDish } from '@fortawesome/free-solid-svg-icons/faSatelliteDish';
// import { faPenToSquare as fasPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faUsersGear as fasUsersGear } from '@fortawesome/free-solid-svg-icons/faUsersGear';
import { MenuItem } from 'projects/shared/components/app-menu/menu-item';

@Component({
  selector: 'br-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.menuItems = this.menuItems = [
      {
        text: 'Информационен портал',
        icon: fasSatelliteDish,
        isOpen: true,
        visible: true,
        menuItems: [
          {
            text: 'Посредници',
            icon: fasUsersGear,
            routeCommands: ['./admin'],
            visible: true
          },
          {
            text: 'Имущество',
            icon: fasHouseFire,
            routeCommands: ['./broker'],
            visible: true
          },
          {
            text: 'Туристическа',
            icon: fasPersonHiking,
            routeCommands: ['./broker'],
            visible: true
          },
          {
            text: 'ППЧ',
            icon: fasPlaneDeparture,
            routeCommands: ['./broker'],
            visible: true
          }
        ]
      }
    ];
  }
}
