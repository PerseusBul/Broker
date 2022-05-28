import { NavigationExtras } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MenuItem {
  text: string;
  icon?: IconDefinition;
  routeCommands?: any[];
  routeExtras?: NavigationExtras;
  isActiveRouteCommands?: any[];
  showChildrenInline?: boolean;
  menuItems?: MenuItem[];
  isOpen?: boolean;
  isSelected?: boolean;
  externalLink?: string;
  visible: boolean;
}
