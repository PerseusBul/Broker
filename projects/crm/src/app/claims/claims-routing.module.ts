import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthPolicyClaimViewSkeletonComponent } from './health-policy/health-policy-claim-view/health-policy-claim-view.component';
import { HealthPolicyClaimsBoardComponent, HealthPolicyClaimsBoardComponentSkeletonComponent } from './health-policy/health-policy-claims-board/health-policy-claims-board.component';

const routes: Routes = [
  { path: 'health-policy', component: HealthPolicyClaimsBoardComponentSkeletonComponent },
  { path: 'health-policy/:cardNumber', component: HealthPolicyClaimsBoardComponentSkeletonComponent },
  { path: 'health-policy/new', component: HealthPolicyClaimViewSkeletonComponent },
  { path: 'health-policy/:claimId', component: HealthPolicyClaimViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }
