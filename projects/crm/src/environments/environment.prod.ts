import { DynamicEnvironment } from './dynamic-environment';

class Environment extends DynamicEnvironment {

  public production: boolean;
  public appVersion: string;

  constructor() {
    super();
    this.production = true;
    this.appVersion = require('../../../../package.json').version;
  }
}

export const environment = new Environment();

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
