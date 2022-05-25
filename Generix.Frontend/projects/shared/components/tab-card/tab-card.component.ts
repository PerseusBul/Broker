import { Component, Input } from '@angular/core';

@Component({
  selector: 'br-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss']
})
export class TabCardComponent {
  @Input() hideHeader = false;
}
