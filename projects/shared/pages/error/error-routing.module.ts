import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorSkeletonComponent } from './error.component';

const routes: Routes = [{ path: '', component: ErrorSkeletonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
