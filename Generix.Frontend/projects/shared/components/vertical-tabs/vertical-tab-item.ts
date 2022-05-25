import { NavigationExtras } from '@angular/router';

export interface VerticalTabItem {
  text: string;
  routeCommands: any[];
  routeExtras?: NavigationExtras;
}
