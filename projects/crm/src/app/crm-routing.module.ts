import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/shared/helpers';
import { CrmComponent } from './crm.component';

const routes: Routes = [
  {
    path: '',
    component: CrmComponent,
    canActivateChild: [],
    children: [
      // empty route
      { path: '' },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
      },
      {
        path: 'health-policy',
        canActivate: [AuthGuard],
        loadChildren: () => import('./products/health-policy/health-policy.module').then((m) => m.HealthPolicyModule)
      },
      {
        path: 'claims',
        loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule)
      },
      {
        path: 'claims-registry',
        loadChildren: () => import('./claims-registry/claims-registry.module').then((m) => m.ClaimsRegistryModule)
      },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule {}
