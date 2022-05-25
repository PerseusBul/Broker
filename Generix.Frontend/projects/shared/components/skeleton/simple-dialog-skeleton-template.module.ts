import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicIoModule, DynamicModule } from 'ng-dynamic-component';
import { SimpleDialogSkeletonTemplateComponent } from './simple-dialog-skeleton-template.component';

@NgModule({
  declarations: [SimpleDialogSkeletonTemplateComponent],
  imports: [CommonModule, DynamicIoModule, DynamicModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  exports: [SimpleDialogSkeletonTemplateComponent]
})
export class SimpleDialogSkeletonTemplateModule {}
