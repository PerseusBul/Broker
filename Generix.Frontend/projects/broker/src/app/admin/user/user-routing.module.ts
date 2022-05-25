import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewSkeletonComponent } from './user-view/user-view.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'new', component: UserViewSkeletonComponent },
  { path: ':userId', component: UserViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
