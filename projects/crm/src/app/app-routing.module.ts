import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorModule } from 'projects/shared/pages/error/error.module';
import { ForbiddenModule } from 'projects/shared/pages/forbidden/forbidden.module';
import { NotFoundModule } from 'projects/shared/pages/not-found/not-found.module';

const routes: Routes = [
  { path: 'forbidden', loadChildren: () => ForbiddenModule },
  { path: 'not-found', loadChildren: () => NotFoundModule },
  { path: 'error', loadChildren: () => ErrorModule },
  { path: '', redirectTo: 'crm/account/login', pathMatch: 'full' },
  {
    path: 'crm',
    canActivate: [],
    canLoad: [],
    loadChildren: () => import('./crm.module').then((m) => m.CrmModule)
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
