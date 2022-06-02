import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerComponent } from './broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent,
    canActivateChild: [],
    children: [
      // empty route
      { path: '' },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
      },
      {
        path: 'admin',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
      },
      // {
      //   path: 'claims',
      //   loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule)
      // },
      // {
      //   path: 'claims-registry',
      //   loadChildren: () => import('./claims-registry/claims-registry.module').then((m) => m.ClaimsRegistryModule)
      // },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule {}
