import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export enum SysRole {
  Admin = 0,
  AdminBroker = 5,
  AdminRegionalBroker = 6,
  Office = 7,
  Agent = 9
}

export type NeispuoTokenPayload = {
  sub: string;
  selected_role: {
    Username: string;
    SysUserID: number;
    SysRoleID: SysRole;
    InstitutionID: number;
    PositionID: number;
    MunicipalityID?: number | null;
    RegionID?: number | null;
    BudgetingInstitutionID?: number | null;
    PersonID?: number | null;
  };
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {}

  get isAuthenticated() {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }

  get currentNavigation() {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      throw new Error('canLoadOrActivate should only be called from a route guard');
    }
    return currentNavigation;
  }

  get navigatingToUrl() {
    const currentNavigation = this.currentNavigation;
    return currentNavigation.finalUrl?.toString() || currentNavigation.extractedUrl.toString();
  }

  get navigatingToPath() {
    const navigatingToUrl = this.navigatingToUrl;
    const qIndex = navigatingToUrl.indexOf('?');
    return navigatingToUrl.substring(0, qIndex === -1 ? navigatingToUrl.length : qIndex);
  }

  lastDecodedAccessToken: string | null = null;
  lastDecodedTokenPayload: NeispuoTokenPayload | null = null;
  get tokenPayload() {
    const accessToken = this.oauthService.getAccessToken();

    if (accessToken == null) {
      this.lastDecodedAccessToken = null;
      this.lastDecodedTokenPayload = null;
    } else if (this.lastDecodedAccessToken != accessToken) {
      this.lastDecodedAccessToken = accessToken;
      this.lastDecodedTokenPayload = jwtDecode<JwtPayload>(accessToken) as NeispuoTokenPayload;
    }

    return this.lastDecodedTokenPayload;
  }

  get isAdmin() {
    return this.tokenPayload?.selected_role.SysRoleID === SysRole.Admin;
  }

  get sysUserID() {
    return this.tokenPayload?.selected_role.SysUserID;
  }

  retirectToReturnUrl() {
    if (!this.isAuthenticated) {
      return true;
    }

    if (this.currentNavigation.previousNavigation != null) {
      // navigate to returnUrl on initial navigation only
      return true;
    }

    const returnUrl = this.oauthService.state && decodeURIComponent(this.oauthService.state);
    if (this.navigatingToPath !== '/' || !returnUrl || typeof returnUrl !== 'string' || returnUrl === '/') {
      // navigate to returnUrl only when opening the default route and there is a returnUrl
      return true;
    }

    return this.router.parseUrl(returnUrl);
  }

  retirectToDefaultRoute() {
    if (!this.isAuthenticated || !this.tokenPayload) {
      return true;
    }

    if (this.navigatingToPath !== '/') {
      return true;
    }

    switch (this.tokenPayload.selected_role.SysRoleID) {
      case SysRole.Admin:
      case SysRole.AdminBroker:
        // TODO get the latest school year for that institution
        // TODO redirect to the info board, or better yet, setup the redirect in the teacher-routing.module.ts
        return this.router.createUrlTree([2020, this.tokenPayload.selected_role.InstitutionID]);
      case SysRole.AdminRegionalBroker:
        return this.router.createUrlTree(['student']);
      default:
        return this.router.createUrlTree(['not-found']);
    }
  }

  blockIfNotAuthenticatedAs(roles: SysRole[]) {
    if (!this.isAuthenticated || !this.tokenPayload) {
      return false;
    }

    if (roles.indexOf(this.tokenPayload.selected_role.SysRoleID) === -1) {
      return false;
    }

    return true;
  }

  forbidIfNotAuthenticatedAs(roles: SysRole[]) {
    const canProceed = this.blockIfNotAuthenticatedAs(roles);
    if (!canProceed) {
      return this.router.createUrlTree(['forbidden', { returnUrl: this.navigatingToUrl }]);
    }

    return true;
  }
}
