import { Component, OnInit } from '@angular/core';
import { faFileMedical as fasFileMedical } from '@fortawesome/free-solid-svg-icons/faFileMedical';
// import { faPenToSquare as fasPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faHandHoldingMedical as fasHandHoldingMedical } from '@fortawesome/free-solid-svg-icons/faHandHoldingMedical';
import { faHospitalUser as fasHospitalUser } from '@fortawesome/free-solid-svg-icons/faHospitalUser';
import { faNotesMedical as fasNotesMedical } from '@fortawesome/free-solid-svg-icons/faNotesMedical';
import { MenuItem } from 'projects/shared/components/app-menu/menu-item';
import { superdocLink } from 'projects/shared/utils/various';

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
        text: 'Медицинска застраховка',
        icon: fasHandHoldingMedical,
        isOpen: true,
        visible: true,
        menuItems: [
          {
            text: 'Полици',
            icon: fasFileMedical,
            routeCommands: ['./health-policy'],
            visible: true
          },
          {
            text: 'Претенции',
            icon: fasNotesMedical,
            routeCommands: ['./claims/health-policy'],
            visible: true
          },
          {
            text: 'Заявка на претенция',
            icon: fasHospitalUser,
            routeCommands: ['./claims-registry/health-policy/request'],
            visible: true
          },
          {
            text: '',
            externalLink: superdocLink,
            visible: true
          }
        ]
      }
    ];
  }
}
