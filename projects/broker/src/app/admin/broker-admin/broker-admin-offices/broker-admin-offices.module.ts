import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import {
  BrokerAdminOfficeViewComponent,
  BrokerAdminOfficeViewSkeletonComponent
} from './broker-admin-office-view/broker-admin-office-view.component';
import { BrokerAdminOfficesRoutingModule } from './broker-admin-offices-routing.module';
import { BrokerAdminOfficesComponent } from './broker-admin-offices/broker-admin-offices.component';

@NgModule({
  declarations: [BrokerAdminOfficeViewComponent, BrokerAdminOfficesComponent, BrokerAdminOfficeViewSkeletonComponent],
  imports: [
    CommonModule,
    BrokerAdminOfficesRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class BrokerAdminOfficesModule {}
