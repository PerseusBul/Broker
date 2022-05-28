import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppChromeModule } from 'projects/shared/components/app-chrome/app-chrome.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, MatIconModule, AppChromeModule]
})
export class NotFoundModule {}
