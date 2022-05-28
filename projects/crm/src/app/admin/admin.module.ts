import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountsPreviewComponent } from './accounts-preview/accounts-preview.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AccountsPreviewComponent, AccountUpdateComponent],
  imports: [CommonModule, AdminRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule]
})
export class AdminModule {}
