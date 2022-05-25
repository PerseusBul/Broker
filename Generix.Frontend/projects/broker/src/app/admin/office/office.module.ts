import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { OfficeRoutingModule } from './office-routing.module';
import { OfficeViewComponent, OfficeViewSkeletonComponent } from './office-view/office-view.component';
import { OfficeComponent } from './office/office.component';

@NgModule({
  declarations: [OfficeComponent, OfficeViewComponent, OfficeViewSkeletonComponent],
  imports: [CommonModule, OfficeRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule]
})
export class OfficeModule {}
