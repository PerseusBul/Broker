import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { AppChromeComponent } from './app-chrome.component';

@NgModule({
  declarations: [AppChromeComponent],
  imports: [CommonModule, RouterModule, CommonFormUiModule, MatIconModule, MatMenuModule],
  exports: [AppChromeComponent]
})
export class AppChromeModule {}
