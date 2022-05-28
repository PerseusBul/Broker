import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppChromeModule } from 'projects/shared/components/app-chrome/app-chrome.module';
import { AppMenuModule } from 'projects/shared/components/app-menu/app-menu.module';
import { MessengerModule } from 'projects/shared/components/messenger/messenger.module';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';

@NgModule({
  declarations: [CrmComponent],
  imports: [CommonModule, CrmRoutingModule, AppChromeModule, AppMenuModule, MessengerModule]
})
export class CrmModule {}
