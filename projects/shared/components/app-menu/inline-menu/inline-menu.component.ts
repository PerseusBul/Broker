import { Component, Input } from '@angular/core';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'br-inline-menu',
  templateUrl: './inline-menu.component.html'
})
export class InlineMenuComponent {
  @Input()
  menuItems: MenuItem[] = [] as MenuItem[];
}
