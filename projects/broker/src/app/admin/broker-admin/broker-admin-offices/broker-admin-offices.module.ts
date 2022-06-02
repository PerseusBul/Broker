import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerAdminOfficesRoutingModule } from './broker-admin-offices-routing.module';
import { BrokerAdminOfficeViewComponent } from './broker-admin-office-view/broker-admin-office-view.component';
import { BrokerAdminOfficesComponent } from './broker-admin-offices/broker-admin-offices.component';


@NgModule({
  declarations: [
    BrokerAdminOfficeViewComponent,
    BrokerAdminOfficesComponent
  ],
  imports: [
    CommonModule,
    BrokerAdminOfficesRoutingModule
  ]
})
export class BrokerAdminOfficesModule { }
