import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountFormToolsModule } from 'projects/shared/account-form-tools.module';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { CardDividerModule } from 'projects/shared/components/card-divider/card-divider.module';
import { ClaimRegistryRequestCardModule } from 'projects/shared/components/claim-registry-request-card/claim-registry-request-card.module';
import { DateFieldModule } from 'projects/shared/components/date-field/date-field.module';
import { FormSectionDividerModule } from 'projects/shared/components/form-section-divider/form-section-divider.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { NumberFieldModule } from 'projects/shared/components/number-field/number-field.module';
import { PreviewCardModule } from 'projects/shared/components/preview-card/preview-card.module';
import { TextareaFieldModule } from 'projects/shared/components/textarea-field/textarea-field.module';
import { UploadFilesModule } from 'projects/shared/components/upload-files/upload-files.module';
import { ClaimsRegistryRoutingModule } from './claims-registry-routing.module';
import { HealthPolicyClaimsRegistryAddFilesDialogComponent } from './health-policy/health-policy-claims-registry-add-files-dialog/health-policy-claims-registry-add-files-dialog.component';
import {
  HealthPolicyClaimsRegistryNewPreviewComponent,
  HealthPolicyClaimsRegistryNewPreviewSkeletonComponent
} from './health-policy/health-policy-claims-registry-new-preview/health-policy-claims-registry-new-preview.component';
import {
  HealthPolicyClaimsRegistryNewComponent,
  HealthPolicyClaimsRegistryNewSkeletonComponent
} from './health-policy/health-policy-claims-registry-new/health-policy-claims-registry-new.component';
import { HealthPolicyClaimsRegistryRequestComponent } from './health-policy/health-policy-claims-registry-request/health-policy-claims-registry-request.component';

@NgModule({
  declarations: [
    HealthPolicyClaimsRegistryNewComponent,
    HealthPolicyClaimsRegistryRequestComponent,
    HealthPolicyClaimsRegistryNewPreviewComponent,
    HealthPolicyClaimsRegistryNewSkeletonComponent,
    HealthPolicyClaimsRegistryNewPreviewSkeletonComponent,
    HealthPolicyClaimsRegistryAddFilesDialogComponent
  ],
  imports: [
    CommonModule,
    ClaimsRegistryRoutingModule,
    CommonFormUiModule,
    AccountFormToolsModule,
    NomSelectModule,
    UploadFilesModule,
    MatCheckboxModule,
    TextareaFieldModule,
    DateFieldModule,
    CardDividerModule,
    FormSectionDividerModule,
    MatIconModule,
    NumberFieldModule,
    MatTooltipModule,
    PreviewCardModule,
    ClaimRegistryRequestCardModule,
    MatDialogModule
  ]
})
export class ClaimsRegistryModule {}
