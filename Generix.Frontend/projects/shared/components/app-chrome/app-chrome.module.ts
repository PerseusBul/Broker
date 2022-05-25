import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppChromeComponent } from './app-chrome.component';

@NgModule({
  declarations: [AppChromeComponent],
  imports: [CommonModule],
  exports: [AppChromeComponent]
})
export class AppChromeModule {}
