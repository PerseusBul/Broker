import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import {
  BrokerAdminRegionViewComponent,
  BrokerAdminRegionViewSkeletonComponent
} from './broker-admin-region-view/broker-admin-region-view.component';
import { BrokerAdminRegionsRoutingModule } from './broker-admin-regions-routing.module';
import { BrokerAdminRegionsComponent } from './broker-admin-regions/broker-admin-regions.component';

@NgModule({
  declarations: [BrokerAdminRegionsComponent, BrokerAdminRegionViewComponent, BrokerAdminRegionViewSkeletonComponent],
  imports: [
    CommonModule,
    BrokerAdminRegionsRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class BrokerAdminRegionsModule {}
