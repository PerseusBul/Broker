import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent, ErrorSkeletonComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent, ErrorSkeletonComponent],
  imports: [CommonModule, ErrorRoutingModule, MatIconModule, CommonFormUiModule]
})
export class ErrorModule {}
