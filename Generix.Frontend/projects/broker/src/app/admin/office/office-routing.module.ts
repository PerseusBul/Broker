import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeViewSkeletonComponent } from './office-view/office-view.component';
import { OfficeComponent } from './office/office.component';

const routes: Routes = [
  { path: '', component: OfficeComponent },
  { path: 'new', component: OfficeViewSkeletonComponent },
  { path: ':officeId', component: OfficeViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule {}
