// import menuIcon from '!!raw-loader!@material-icons/svg/svg/menu/baseline.svg';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Event, NavigationEnd, Router } from '@angular/router';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'crm-app-chrome',
  templateUrl: './app-chrome.component.html',
  styleUrls: ['./app-chrome.component.scss']
})
export class AppChromeComponent implements OnInit, OnDestroy {
  leftSideIsOpen = false;
  baselineMenuIcon: SafeHtml;
  fadUserPlus = fadUserPlus;
  private readonly subscriptions: Subscription = new Subscription();
  hasLoggedUser: boolean = false;

  constructor(
    sanitizer: DomSanitizer,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private authenticationService: AuthenticationService,
    private messengerService: MessengerService
  ) {
    this.baselineMenuIcon = sanitizer.bypassSecurityTrustHtml('menuIcon'); //menuIcon

    this.subscriptions.add(
      router.events.subscribe((s: Event) => {
        if (s instanceof NavigationEnd) {
          this.hideLeftSide();
        }
      })
    );
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.authenticationService.currentUser.subscribe(
        (currentUser) => (this.hasLoggedUser = currentUser?.success ?? false)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleLeftIsSideOpen() {
    this.leftSideIsOpen = !this.leftSideIsOpen;
  }

  hideLeftSide() {
    this.leftSideIsOpen = false;
  }

  logout() {
    this.authenticationService.logout();
    this.messengerService.clear();
  }
}
