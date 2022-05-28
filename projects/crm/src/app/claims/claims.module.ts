import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { ClaimsRegistryModule } from '../claims-registry/claims-registry.module';
import { ClaimsRoutingModule } from './claims-routing.module';
import {
  HealthPolicyClaimViewComponent,
  HealthPolicyClaimViewSkeletonComponent
} from './health-policy/health-policy-claim-view/health-policy-claim-view.component';
import {
  HealthPolicyClaimsBoardComponent,
  HealthPolicyClaimsBoardComponentSkeletonComponent
} from './health-policy/health-policy-claims-board/health-policy-claims-board.component';

@NgModule({
  declarations: [
    HealthPolicyClaimsBoardComponent,
    HealthPolicyClaimViewComponent,
    HealthPolicyClaimViewSkeletonComponent,
    HealthPolicyClaimsBoardComponentSkeletonComponent
  ],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule,
    CdkAccordionModule,
    MatCheckboxModule,
    MatDialogModule,
    ClaimsRegistryModule
  ]
})
export class ClaimsModule {}
