import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerAdminUserViewSkeletonComponent } from './broker-admin-user-view/broker-admin-user-view.component';
import { BrokerAdminUsersComponent } from './broker-admin-users/broker-admin-users.component';

const routes: Routes = [
  { path: '', component: BrokerAdminUsersComponent },
  { path: 'new', component: BrokerAdminUserViewSkeletonComponent },
  { path: ':id', component: BrokerAdminUserViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerAdminUsersRoutingModule {}
