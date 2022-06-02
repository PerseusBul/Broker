import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerAdminBrokersRoutingModule } from './broker-admin-brokers-routing.module';
import { BrokerAdminBrokersComponent } from './broker-admin-brokers/broker-admin-brokers.component';
import { BrokerAdminBrokerViewComponent } from './broker-admin-broker-view/broker-admin-broker-view.component';


@NgModule({
  declarations: [
    BrokerAdminBrokersComponent,
    BrokerAdminBrokerViewComponent
  ],
  imports: [
    CommonModule,
    BrokerAdminBrokersRoutingModule
  ]
})
export class BrokerAdminBrokersModule { }
