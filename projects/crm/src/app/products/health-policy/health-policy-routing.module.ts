import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthPolicySkeletonComponent } from './health-policy-board/health-policy-board.component';
import { HealthPolicyViewSkeletonComponent } from './health-policy-view/health-policy-view.component';

const routes: Routes = [
  { path: '', component: HealthPolicySkeletonComponent },
  { path: 'new', component: HealthPolicyViewSkeletonComponent },
  { path: ':policyId', component: HealthPolicyViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthPolicyRoutingModule {}
