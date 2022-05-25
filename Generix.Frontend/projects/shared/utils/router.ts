import {
  ActivatedRouteSnapshot,
  Data,
  DetachedRouteHandle,
  ResolveData,
  Route,
  RouteReuseStrategy,
  RunGuardsAndResolvers
} from '@angular/router';
import { deepEqual } from './various';

type RouteMap = {
  outlet?: string;
  canActivate?: any[];
  canActivateChild?: any[];
  canDeactivate?: any[];
  canLoad?: any[];
  data?: Data;
  resolve?: ResolveData;
  runGuardsAndResolvers?: RunGuardsAndResolvers;
};
export function mapRoutes(routeMap: RouteMap, routes: Route[]): Route[] {
  return routes.map((r) => {
    if (routeMap.canActivate) {
      if (r.canActivate) {
        r.canActivate.unshift(...routeMap.canActivate);
      } else {
        r.canActivate = routeMap.canActivate;
      }
    }
    if (routeMap.canActivateChild) {
      if (r.canActivateChild) {
        r.canActivateChild.unshift(...routeMap.canActivateChild);
      } else {
        r.canActivateChild = routeMap.canActivateChild;
      }
    }
    if (routeMap.canDeactivate) {
      if (r.canDeactivate) {
        r.canDeactivate.unshift(...routeMap.canDeactivate);
      } else {
        r.canDeactivate = routeMap.canDeactivate;
      }
    }
    if (routeMap.canLoad) {
      if (r.canLoad) {
        r.canLoad.unshift(...routeMap.canLoad);
      } else {
        r.canLoad = routeMap.canLoad;
      }
    }

    if (routeMap.outlet != null) {
      r.outlet = routeMap.outlet;
    }
    if (routeMap.data != null) {
      r.data = routeMap.data;
    }
    if (routeMap.resolve != null) {
      r.resolve = routeMap.resolve;
    }
    if (routeMap.runGuardsAndResolvers != null) {
      r.runGuardsAndResolvers = routeMap.runGuardsAndResolvers;
    }

    return r;
  });
}

// https://stackoverflow.com/questions/41280471/how-to-implement-routereusestrategy-shoulddetach-for-specific-routes-in-angular
export class ParamsRouteReuseStrategy implements RouteReuseStrategy {
  /**
   * Whether the given route should detach for later reuse.
   * Always returns false.
   * */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /** Returns `null` because this strategy does not store routes for later re-use. */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * Determines if a route should be reused.
   * Always returns false.
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      deepEqual(future.params, curr.params) &&
      deepEqual(future.queryParams, curr.queryParams)
    );
  }
}
