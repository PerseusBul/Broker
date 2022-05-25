import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerComponent } from './broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent,
    canActivateChild: [],
    children: [
      { path: '' },
      {
        path: 'policy',
        loadChildren: () => import('./dump-piece/dump-piece.module').then((m) => m.DumpPieceModule)
      },
      {
        path: 'agent',
        loadChildren: () => import('./admin/agent/agent.module').then((m) => m.AgentModule)
      },
      {
        path: 'region',
        loadChildren: () => import('./admin/region/region.module').then((m) => m.RegionModule)
      },
      {
        path: 'office',
        loadChildren: () => import('./admin/office/office.module').then((m) => m.OfficeModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./admin/user/user.module').then((m) => m.UserModule)
      },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule {}
