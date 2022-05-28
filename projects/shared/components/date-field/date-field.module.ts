import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { BrDateAdapter, BR_DATE_FORMATS } from './BrDateAdapter';
import { BrDatepickerIntl } from './BrDatepickerIntl';
import { ClearInvalidDateDirective } from './clear-invalid-date.directive';
import { DateFieldComponent } from './date-field.component';

@NgModule({
  declarations: [ClearInvalidDateDirective, DateFieldComponent],
  imports: [
    CommonModule,
    FontAwesomeWithConfigModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [DateFieldComponent],
  providers: [
    BrDatepickerIntl,
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
    { provide: DateAdapter, useClass: BrDateAdapter }
  ]
})
export class DateFieldModule {}
