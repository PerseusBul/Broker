import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminCompanyDataComponent } from './broker-admin/broker-admin-company-data/broker-admin-company-data.component';
import { BrokerAdminComponent } from './broker-admin/broker-admin.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerAdminComponent,
    children: [
      {
        path: 'agents',
        loadChildren: () =>
          import('./broker-admin/broker-admin-agents/broker-admin-agents.module').then((m) => m.BrokerAdminAgentsModule)
      },
      {
        path: 'regions',
        loadChildren: () =>
          import('./broker-admin/broker-admin-regions/broker-admin-regions.module').then(
            (m) => m.BrokerAdminRegionsModule
          )
      },
      {
        path: 'offices',
        loadChildren: () =>
          import('./broker-admin/broker-admin-offices/broker-admin-offices.module').then(
            (m) => m.BrokerAdminOfficesModule
          )
      },
      { path: 'company-data', component: BrokerAdminCompanyDataComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
