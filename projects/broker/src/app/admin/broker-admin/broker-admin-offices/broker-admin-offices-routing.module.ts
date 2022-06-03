import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminOfficeViewSkeletonComponent } from './broker-admin-office-view/broker-admin-office-view.component';
import { BrokerAdminOfficesComponent } from './broker-admin-offices/broker-admin-offices.component';

const routes: Routes = [
  { path: '', component: BrokerAdminOfficesComponent },
  { path: 'new', component: BrokerAdminOfficeViewSkeletonComponent },
  { path: ':id', component: BrokerAdminOfficeViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerAdminOfficesRoutingModule {}
