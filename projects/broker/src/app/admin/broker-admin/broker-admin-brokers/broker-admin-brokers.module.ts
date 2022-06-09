import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import {
  BrokerAdminBrokerViewComponent,
  BrokerAdminBrokerViewSkeletonComponent
} from './broker-admin-broker-view/broker-admin-broker-view.component';
import { BrokerAdminBrokersRoutingModule } from './broker-admin-brokers-routing.module';
import { BrokerAdminBrokersComponent } from './broker-admin-brokers/broker-admin-brokers.component';

@NgModule({
  declarations: [BrokerAdminBrokersComponent, BrokerAdminBrokerViewComponent, BrokerAdminBrokerViewSkeletonComponent],
  imports: [
    CommonModule,
    BrokerAdminBrokersRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class BrokerAdminBrokersModule {}
