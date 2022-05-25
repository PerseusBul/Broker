import { Component, Input } from '@angular/core';
import { faMinus as fasMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'br-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input()
  menuItems: MenuItem[] = [] as MenuItem[];

  @Input()
  level = 1;

  fasMinus = fasMinus;

  toggleOpen(menuItem: MenuItem) {
    menuItem.isOpen = !menuItem.isOpen;
  }
}
