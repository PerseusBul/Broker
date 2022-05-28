import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { ClaimRegistryRequestCardComponent } from './claim-registry-request-card.component';

@NgModule({
  declarations: [ClaimRegistryRequestCardComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FontAwesomeWithConfigModule],
  exports: [ClaimRegistryRequestCardComponent]
})
export class ClaimRegistryRequestCardModule {}
