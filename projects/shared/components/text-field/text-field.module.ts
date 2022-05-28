import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { TextFieldComponent } from './text-field.component';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeWithConfigModule
  ],
  exports: [TextFieldComponent]
})
export class TextFieldModule {}
