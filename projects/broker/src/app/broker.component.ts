import { Component, OnInit } from '@angular/core';
import { faFileMedical as fasFileMedical } from '@fortawesome/free-solid-svg-icons/faFileMedical';
// import { faPenToSquare as fasPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faHandHoldingMedical as fasHandHoldingMedical } from '@fortawesome/free-solid-svg-icons/faHandHoldingMedical';
import { faHospitalUser as fasHospitalUser } from '@fortawesome/free-solid-svg-icons/faHospitalUser';
import { faNotesMedical as fasNotesMedical } from '@fortawesome/free-solid-svg-icons/faNotesMedical';
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
        text: 'Недоклатено меню',
        icon: fasHandHoldingMedical,
        isOpen: true,
        visible: true,
        menuItems: [
          {
            text: 'Брокери',
            icon: fasFileMedical,
            routeCommands: ['./broker'],
            visible: true
          },
          {
            text: 'Имущество',
            icon: fasNotesMedical,
            routeCommands: ['./broker'],
            visible: true
          },
          {
            text: 'Туристическа',
            icon: fasHospitalUser,
            routeCommands: ['./broker'],
            visible: true
          }
          // {
          //   text: '',
          //   externalLink: superdocLink,
          //   visible: true
          // }
        ]
      }
    ];
  }
}
