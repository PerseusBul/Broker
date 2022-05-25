import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenModule } from 'projects/shared/pages/forbidden/forbidden.module';
import { NotFoundModule } from 'projects/shared/pages/not-found/not-found.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'forbidden', loadChildren: () => ForbiddenModule /* skip lazy-loading */ },
  { path: 'not-found', loadChildren: () => NotFoundModule /* skip lazy-loading */ },
  { path: '', component: AppComponent, pathMatch: 'full' },
  {
    path: 'broker',
    canActivate: [],
    canLoad: [],
    loadChildren: () => import('./broker.module').then((m) => m.BrokerModule)
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
