import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminBrokerViewSkeletonComponent } from './broker-admin-broker-view/broker-admin-broker-view.component';
import { BrokerAdminBrokersComponent } from './broker-admin-brokers/broker-admin-brokers.component';

const routes: Routes = [
  { path: '', component: BrokerAdminBrokersComponent },
  { path: 'new', component: BrokerAdminBrokerViewSkeletonComponent },
  { path: ':id', component: BrokerAdminBrokerViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerAdminBrokersRoutingModule {}
