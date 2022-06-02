import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import {
  BrokerAdminAgentViewComponent,
  BrokerAdminAgentViewSkeletonComponent
} from './broker-admin-agent-view/broker-admin-agent-view.component';
import { BrokerAdminAgentsRoutingModule } from './broker-admin-agents-routing.module';
import { BrokerAdminAgentsComponent } from './broker-admin-agents/broker-admin-agents.component';

@NgModule({
  declarations: [BrokerAdminAgentsComponent, BrokerAdminAgentViewComponent, BrokerAdminAgentViewSkeletonComponent],
  imports: [CommonModule, BrokerAdminAgentsRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule]
})
export class BrokerAdminAgentsModule {}
