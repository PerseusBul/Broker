import { NgModule } from '@angular/core';
import { DateTimePipe } from './date-time.pipe';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [DatePipe, DateTimePipe],
  imports: [],
  exports: [DatePipe, DateTimePipe]
})
export class DatePipesModule {}
