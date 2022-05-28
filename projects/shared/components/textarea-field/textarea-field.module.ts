import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { TextareaFieldComponent } from './textarea-field.component';

@NgModule({
  declarations: [TextareaFieldComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
    FontAwesomeWithConfigModule,
    MatTooltipModule
  ],
  exports: [TextareaFieldComponent]
})
export class TextareaFieldModule {}
