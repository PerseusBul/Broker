import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { NumberFieldComponent } from './number-field.component';
import { NumberPrecisionDirective } from './number-precision.directive';
import { NumberDirective } from './number.directive';

@NgModule({
  declarations: [NumberDirective, NumberFieldComponent, NumberPrecisionDirective],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeWithConfigModule
  ],
  exports: [NumberFieldComponent]
})
export class NumberFieldModule {}
