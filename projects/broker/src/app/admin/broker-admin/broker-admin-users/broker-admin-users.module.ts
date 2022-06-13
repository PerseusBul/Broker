import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import {
  BrokerAdminUserViewComponent,
  BrokerAdminUserViewSkeletonComponent
} from './broker-admin-user-view/broker-admin-user-view.component';
import { BrokerAdminUsersRoutingModule } from './broker-admin-users-routing.module';
import { BrokerAdminUsersComponent } from './broker-admin-users/broker-admin-users.component';

@NgModule({
  declarations: [BrokerAdminUsersComponent, BrokerAdminUserViewComponent, BrokerAdminUserViewSkeletonComponent],
  imports: [
    CommonModule,
    BrokerAdminUsersRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class BrokerAdminUsersModule {}
