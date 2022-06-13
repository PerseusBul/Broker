import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminRegionViewSkeletonComponent } from './broker-admin-region-view/broker-admin-region-view.component';
import { BrokerAdminRegionsComponent } from './broker-admin-regions/broker-admin-regions.component';

const routes: Routes = [
  { path: '', component: BrokerAdminRegionsComponent },
  { path: 'new', component: BrokerAdminRegionViewSkeletonComponent },
  { path: ':id', component: BrokerAdminRegionViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerAdminRegionsRoutingModule {}
