import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/shared/helpers';
import { HealthPolicyClaimsRegistryNewPreviewSkeletonComponent } from './health-policy/health-policy-claims-registry-new-preview/health-policy-claims-registry-new-preview.component';
import { HealthPolicyClaimsRegistryNewSkeletonComponent } from './health-policy/health-policy-claims-registry-new/health-policy-claims-registry-new.component';
import { HealthPolicyClaimsRegistryRequestComponent } from './health-policy/health-policy-claims-registry-request/health-policy-claims-registry-request.component';

const routes: Routes = [
  { path: 'health-policy/request', component: HealthPolicyClaimsRegistryRequestComponent, canActivate: [AuthGuard] },
  { path: 'health-policy/new', component: HealthPolicyClaimsRegistryNewSkeletonComponent, canActivate: [AuthGuard] },
  { path: 'health-policy/new/preview', component: HealthPolicyClaimsRegistryNewPreviewSkeletonComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRegistryRoutingModule { }
