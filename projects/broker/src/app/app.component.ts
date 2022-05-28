import { Component, OnDestroy, OnInit } from '@angular/core';
import { faArrowLeft as fasArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight as fasArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly fasArrowLeft = fasArrowLeft;
  readonly fasArrowRight = fasArrowRight;
  title = 'broker';
  private readonly subscriptions: Subscription = new Subscription();

  constructor(private ccService: NgcCookieConsentService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.ccService.popupOpen$.subscribe(() => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );

    this.subscriptions.add(
      this.ccService.popupClose$.subscribe(() => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );

    this.subscriptions.add(
      this.ccService?.initialize$?.subscribe((event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );

    this.subscriptions.add(
      this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );

    this.subscriptions.add(
      this.ccService.revokeChoice$.subscribe(() => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );

    this.subscriptions.add(
      this.ccService.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
