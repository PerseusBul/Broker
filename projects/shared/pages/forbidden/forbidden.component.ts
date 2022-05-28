import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'crm-forbidden',
  templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent {
  logoutBtnDisabled = false;

  constructor(public oauthService: OAuthService, private route: ActivatedRoute) {}

  OnLogoutClick() {
    this.logoutBtnDisabled = true;
  }
}
