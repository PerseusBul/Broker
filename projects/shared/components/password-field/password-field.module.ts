import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { PasswordFieldComponent } from './password-field.component';

@NgModule({
  declarations: [PasswordFieldComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FontAwesomeWithConfigModule,
    MatTooltipModule
  ],
  exports: [PasswordFieldComponent]
})
export class PasswordFieldModule {}
