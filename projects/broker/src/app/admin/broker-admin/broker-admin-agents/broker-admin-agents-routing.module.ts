import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminAgentViewSkeletonComponent } from './broker-admin-agent-view/broker-admin-agent-view.component';
import { BrokerAdminAgentsComponent } from './broker-admin-agents/broker-admin-agents.component';

const routes: Routes = [
  { path: '', component: BrokerAdminAgentsComponent },
  { path: 'new', component: BrokerAdminAgentViewSkeletonComponent },
  { path: ':id', component: BrokerAdminAgentViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerAdminAgentsRoutingModule {}
