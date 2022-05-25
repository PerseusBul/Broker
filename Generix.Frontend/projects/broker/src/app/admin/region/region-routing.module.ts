import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionViewSkeletonComponent } from './region-view/region-view.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  { path: '', component: RegionComponent },
  { path: 'new', component: RegionViewSkeletonComponent },
  { path: ':regionId', component: RegionViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule {}
