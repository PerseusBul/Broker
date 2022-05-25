// import menuIcon from '!!raw-loader!@material-icons/svg/svg/menu/baseline.svg';
import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'br-app-chrome',
  templateUrl: './app-chrome.component.html',
  styleUrls: ['./app-chrome.component.scss']
})
export class AppChromeComponent implements OnDestroy {
  leftSideIsOpen = false;
  baselineMenuIcon: SafeHtml;

  private routerEventsSubscription: Subscription;

  constructor(sanitizer: DomSanitizer, private router: Router) {
    this.baselineMenuIcon = sanitizer.bypassSecurityTrustHtml(''); //menuIcon

    this.routerEventsSubscription = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        this.hideLeftSide();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  toggleLeftIsSideOpen() {
    this.leftSideIsOpen = !this.leftSideIsOpen;
  }

  hideLeftSide() {
    this.leftSideIsOpen = false;
  }
}
