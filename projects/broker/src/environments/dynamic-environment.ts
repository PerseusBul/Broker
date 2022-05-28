declare let window: any;

export class DynamicEnvironment {
  constructor() {
  }

  public get apiUrl() {
    return window.config?.apiUrl;
  }

  public get siteKey() {
    return window.config?.siteKey;
  }

  public get domain() {
    return window.config?.domain;
  }
}
