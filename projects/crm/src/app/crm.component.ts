import { Component, OnInit } from '@angular/core';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons/faStar';
// import { faCalendarWeek as fadCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
// import { faCogs as fadCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
// import { faFileAlt as fadFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
// import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
// import { faFileInvoice as fadFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
// import { faUserTag as fasUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
// import { faUserMinus as fadUserMinus } from '@fortawesome/free-solid-svg-icons/faUserMinus';
import { faBusinessTime as fasBusinessTime } from '@fortawesome/free-solid-svg-icons/faBusinessTime';
import { faFileMedical as fasFileMedical } from '@fortawesome/free-solid-svg-icons/faFileMedical';
// import { faPenToSquare as fasPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faHandHoldingMedical as fasHandHoldingMedical } from '@fortawesome/free-solid-svg-icons/faHandHoldingMedical';
import { faHospitalUser as fasHospitalUser } from '@fortawesome/free-solid-svg-icons/faHospitalUser';
import { faNotesMedical as fasNotesMedical } from '@fortawesome/free-solid-svg-icons/faNotesMedical';
import { MenuItem } from 'projects/shared/components/app-menu/menu-item';
import { superdocLink } from 'projects/shared/utils/various';

@Component({
  selector: 'crm-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() { }

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
