import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { HealthPolicyBoardComponent, HealthPolicySkeletonComponent } from './health-policy-board/health-policy-board.component';
import { HealthPolicyRoutingModule } from './health-policy-routing.module';
import {
  HealthPolicyViewComponent,
  HealthPolicyViewSkeletonComponent
} from './health-policy-view/health-policy-view.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    HealthPolicyBoardComponent,
    HealthPolicyViewComponent,
    HealthPolicyViewSkeletonComponent,
    HealthPolicySkeletonComponent,
  ],
  imports: [
    CommonModule,
    HealthPolicyRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    CdkAccordionModule,
    MatCheckboxModule,
  ],
})
export class HealthPolicyModule { }
