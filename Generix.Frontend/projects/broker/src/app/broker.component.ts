import { Component, OnInit } from '@angular/core';
import { faBasketballBall as fasBasketballBall } from '@fortawesome/free-solid-svg-icons/faBasketballBall';
import { faFileInvoice as fasFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faSquareFull as fasSquareFull } from '@fortawesome/free-solid-svg-icons/faSquareFull';
import { faUserFriends as fasUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
// import { faCalendar as fadCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
// import { faCalendarDay as fasCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons/faStar';
// import { faCalendarWeek as fadCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
// import { faCogs as fadCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
// import { faFileAlt as fadFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
// import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
// import { faFileInvoice as fadFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
// import { faUserTag as fasUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
// import { faUserMinus as fadUserMinus } from '@fortawesome/free-solid-svg-icons/faUserMinus';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
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
        text: 'Полици',
        icon: fasFileInvoice,
        routeCommands: ['./policy']
      },
      {
        text: 'Агент',
        icon: fasBasketballBall,
        routeCommands: ['./agent']
      },
      {
        text: 'Регион',
        icon: fasSquareFull,
        routeCommands: ['./region']
      },
      {
        text: 'Офис',
        icon: fadUserPlus,
        routeCommands: ['./office']
      },
      {
        text: 'Потребител',
        icon: fasUserFriends,
        routeCommands: ['./user']
      }
    ];
  }
}
