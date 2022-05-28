import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { SelectFieldComponent } from './select-field.component';

@NgModule({
  declarations: [SelectFieldComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FontAwesomeWithConfigModule,
    MatTooltipModule
  ],
  exports: [SelectFieldComponent]
})
export class SelectFieldModule {}
