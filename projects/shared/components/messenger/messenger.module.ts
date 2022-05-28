import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';

@NgModule({
  declarations: [MessengerComponent],
  imports: [CommonModule, MessengerRoutingModule, MatIconModule],
  exports: [MessengerComponent]
})
export class MessengerModule {}
