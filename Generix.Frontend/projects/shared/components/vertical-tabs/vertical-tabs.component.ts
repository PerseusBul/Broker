import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Event as RouteEvent, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VerticalTabItem } from './vertical-tab-item';

@Component({
  selector: 'br-vertical-tabs',
  templateUrl: './vertical-tabs.component.html'
})
export class VerticalTabsComponent implements OnInit, OnDestroy {
  @Input() tabs: VerticalTabItem[] = [];

  selectedTab = '';

  private routerEventsSubscription: Subscription;

  constructor(private router: Router) {
    this.routerEventsSubscription = router.events.subscribe((s: RouteEvent) => {
      if (s instanceof NavigationEnd) {
        this.updateSelectedTab();
      }
    });
  }

  ngOnInit() {
    this.updateSelectedTab();
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  onChange(event: Event) {
    this.selectedTab = (event.target as HTMLSelectElement)?.value;

    const selectedTabIndex = parseInt(this.selectedTab);

    if (!isNaN(selectedTabIndex) && this.tabs[selectedTabIndex]) {
      Promise.resolve().then(() => {
        this.router.navigate(this.tabs[selectedTabIndex].routeCommands, this.tabs[selectedTabIndex].routeExtras);
      });
    }
  }

  private updateSelectedTab() {
    if (!this.tabs || !this.router.navigated) return;
    // TODO Huge possibility of issues
    Promise.resolve().then(() => {
      const selectedTabIndex = this.tabs.findIndex(
        (t) =>
          t.routeCommands &&
          this.router.isActive(this.router.createUrlTree(t.routeCommands, t.routeExtras), {
            paths: 'subset',
            queryParams: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored'
          })
      );

      this.selectedTab = selectedTabIndex !== -1 ? selectedTabIndex.toString() : '';
    });
  }
}
