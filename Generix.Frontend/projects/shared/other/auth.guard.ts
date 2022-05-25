import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { AuthService, SysRole } from '../services/auth.service';
// TODO Extend for all roles
@Injectable({ providedIn: 'root' })
export class RetirectToReturnUrlGuard implements CanActivate {
  constructor(private authGuardService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.retirectToReturnUrl();
  }
}

@Injectable({ providedIn: 'root' })
export class RetirectToDefaultRouteGuard implements CanActivate {
  constructor(private authGuardService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.retirectToDefaultRoute();
  }
}
@Injectable({ providedIn: 'root' })
export class BlockIfNotAuthenticatedAsAdministrator implements CanLoad {
  constructor(private authGuardService: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authGuardService.blockIfNotAuthenticatedAs([SysRole.Admin]);
  }
}

@Injectable({ providedIn: 'root' })
export class BlockIfNotAuthenticatedAsAdminRegionalBroker implements CanLoad {
  constructor(private authGuardService: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authGuardService.blockIfNotAuthenticatedAs([SysRole.AdminRegionalBroker]);
  }
}

@Injectable({ providedIn: 'root' })
export class ForbidIfNotAuthenticatedAsAdmin implements CanActivate {
  constructor(private authGuardService: AuthService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.forbidIfNotAuthenticatedAs([SysRole.Admin]);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.forbidIfNotAuthenticatedAs([SysRole.Admin]);
  }
}

@Injectable({ providedIn: 'root' })
export class ForbidIfNotAuthenticatedAsAdminRegionalBroker implements CanActivate, CanActivateChild {
  constructor(private authGuardService: AuthService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.forbidIfNotAuthenticatedAs([SysRole.AdminRegionalBroker]);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuardService.forbidIfNotAuthenticatedAs([SysRole.AdminRegionalBroker]);
  }
}
