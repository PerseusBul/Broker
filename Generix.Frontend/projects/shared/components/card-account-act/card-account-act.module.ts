import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { CardAccountActComponent } from './card-account-act.component';

@NgModule({
  declarations: [CardAccountActComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FontAwesomeWithConfigModule],
  exports: [CardAccountActComponent]
})
export class CardAccountActModule {}
