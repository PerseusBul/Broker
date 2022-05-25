import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from './menu-item';

@Component({
  selector: 'br-app-menu',
  templateUrl: './app-menu.component.html'
})
export class AppMenuComponent implements OnChanges, OnDestroy {
  @Input()
  menuItems: MenuItem[] = [] as MenuItem[];

  private routerEventsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.routerEventsSubscription = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        this.selectActiveState();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectActiveState();
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  private selectActiveState() {
    if (!this.menuItems || !this.router.navigated) return;

    Promise.resolve().then(() => {
      for (let menuItem of this.iterateItems(this.menuItems)) {
        menuItem.isSelected = false;
      }

      for (let menuItem of this.findActivePath(this.menuItems)) {
        menuItem.isSelected = true;
        if (menuItem?.menuItems?.length) {
          menuItem.isOpen = true;
        }
      }
    });
  }

  private *iterateItems(menuItems: MenuItem[]): Generator<MenuItem> {
    for (let menuItem of menuItems) {
      yield* this.iterateItems(menuItem.menuItems || []);

      yield menuItem;
    }
  }

  private *findActivePath(menuItems: MenuItem[]): Generator<MenuItem, void, undefined> {
    for (let menuItem of menuItems) {
      let foundChildren = [...this.findActivePath(menuItem.menuItems || [])];

      if (
        foundChildren.length ||
        (menuItem.isActiveRouteCommands &&
          this.router.isActive(
            this.router.createUrlTree(menuItem.isActiveRouteCommands, {
              relativeTo: this.route,
              ...menuItem.routeExtras
            }),
            false
          )) ||
        (menuItem.routeCommands &&
          this.router.isActive(
            this.router.createUrlTree(menuItem.routeCommands, { relativeTo: this.route, ...menuItem.routeExtras }),
            false
          ))
      ) {
        yield* foundChildren;
        yield menuItem;
      }
    }
  }
}
