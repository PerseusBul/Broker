import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminAgentsComponent } from './broker-admin/broker-admin-agents/broker-admin-agents/broker-admin-agents.component';
import { BrokerAdminCompanyDataComponent } from './broker-admin/broker-admin-company-data/broker-admin-company-data.component';
import { BrokerAdminOfficesComponent } from './broker-admin/broker-admin-offices/broker-admin-offices/broker-admin-offices.component';
import { BrokerAdminComponent } from './broker-admin/broker-admin.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerAdminComponent,
    children: [
      { path: 'company-data', component: BrokerAdminCompanyDataComponent },
      { path: 'offices', component: BrokerAdminOfficesComponent },
      { path: 'agents', component: BrokerAdminAgentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
