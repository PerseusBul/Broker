import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { UploadFilesComponent } from './upload-files.component';

@NgModule({
  declarations: [UploadFilesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    TextFieldModule,
    FontAwesomeWithConfigModule,
    MatTooltipModule
  ],
  exports: [UploadFilesComponent]
})
export class UploadFilesModule {}
