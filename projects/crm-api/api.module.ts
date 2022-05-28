import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthenticationService } from './api/authentication.service';
//import { DataSourcesService } from './api/dataSources.service';
import { UsersService } from './api/users.service';
import { Configuration } from './configuration';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AuthenticationService,
    // DataSourcesService,
    UsersService
  ]
})
export class ApiModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
