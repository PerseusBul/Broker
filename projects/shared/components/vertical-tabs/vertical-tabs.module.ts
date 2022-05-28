import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerticalTabsComponent } from './vertical-tabs.component';

@NgModule({
  declarations: [VerticalTabsComponent],
  imports: [CommonModule, RouterModule],
  exports: [VerticalTabsComponent]
})
export class VerticalTabsModule {}
