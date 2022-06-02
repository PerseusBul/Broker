import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminAgentViewSkeletonComponent } from './broker-admin/broker-admin-agents/broker-admin-agent-view/broker-admin-agent-view.component';
import { BrokerAdminAgentsComponent } from './broker-admin/broker-admin-agents/broker-admin-agents/broker-admin-agents.component';
import { BrokerAdminCompanyDataComponent } from './broker-admin/broker-admin-company-data/broker-admin-company-data.component';
import { BrokerAdminComponent } from './broker-admin/broker-admin.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerAdminComponent,
    children: [
      { path: 'company-data', component: BrokerAdminCompanyDataComponent },
      { path: 'agents/new', component: BrokerAdminAgentViewSkeletonComponent },
      { path: 'agents/:id', component: BrokerAdminAgentViewSkeletonComponent },
      { path: 'agents', component: BrokerAdminAgentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
