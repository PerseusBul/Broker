import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { TabsModule } from 'projects/shared/components/tabs/tabs.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BrokerAdminComponent } from './broker-admin/broker-admin.component';

@NgModule({
  declarations: [BrokerAdminComponent],
  imports: [CommonModule, AdminRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule, TabsModule]
})
export class AdminModule {}
