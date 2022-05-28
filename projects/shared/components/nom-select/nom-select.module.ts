import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { NomSelectComponent } from './nom-select.component';

@NgModule({
  declarations: [NomSelectComponent],
  imports: [
    CommonModule,
    MatInputModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeWithConfigModule
  ],
  exports: [NomSelectComponent]
})
export class NomSelectModule {}
