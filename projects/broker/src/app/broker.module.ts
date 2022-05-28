import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppChromeModule } from 'projects/shared/components/app-chrome/app-chrome.module';
import { AppMenuModule } from 'projects/shared/components/app-menu/app-menu.module';
import { MessengerModule } from 'projects/shared/components/messenger/messenger.module';
import { BrokerRoutingModule } from './broker-routing.module';
import { BrokerComponent } from './broker.component';

@NgModule({
  declarations: [BrokerComponent],
  imports: [CommonModule, BrokerRoutingModule, AppChromeModule, AppMenuModule, MessengerModule]
})
export class BrokerModule {}
