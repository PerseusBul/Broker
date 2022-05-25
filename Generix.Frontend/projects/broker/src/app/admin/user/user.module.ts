import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent, UserViewSkeletonComponent } from './user-view/user-view.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserComponent, UserViewComponent, UserViewSkeletonComponent],
  imports: [CommonModule, UserRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule]
})
export class UserModule {}
