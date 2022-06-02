import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { TabsModule } from 'projects/shared/components/tabs/tabs.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { AdminRoutingModule } from './admin-routing.module';
import {
  BrokerAdminAgentsViewComponent,
  BrokerAdminAgentsViewSkeletonComponent
} from './broker-admin/broker-admin-agents/broker-admin-agents-view/broker-admin-agents-view.component';
import { BrokerAdminAgentsComponent } from './broker-admin/broker-admin-agents/broker-admin-agents/broker-admin-agents.component';
import { BrokerAdminCompanyDataComponent } from './broker-admin/broker-admin-company-data/broker-admin-company-data.component';
import { BrokerAdminOfficesViewComponent } from './broker-admin/broker-admin-offices/broker-admin-offices-view/broker-admin-offices-view.component';
import { BrokerAdminOfficesComponent } from './broker-admin/broker-admin-offices/broker-admin-offices/broker-admin-offices.component';
import { BrokerAdminComponent } from './broker-admin/broker-admin.component';

@NgModule({
  declarations: [
    BrokerAdminComponent,
    BrokerAdminCompanyDataComponent,
    BrokerAdminAgentsComponent,
    BrokerAdminOfficesComponent,
    BrokerAdminAgentsViewComponent,
    BrokerAdminOfficesViewComponent,
    BrokerAdminAgentsViewSkeletonComponent
  ],
  imports: [CommonModule, AdminRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule, TabsModule]
})
export class AdminModule {}
