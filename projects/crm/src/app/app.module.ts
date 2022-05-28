import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { APIS } from 'projects/crm-api';
import { FontAwesomeWithConfigModule } from 'projects/shared/font-awesome-with-config.module';
import { cookieConfig } from 'projects/shared/utils/cookie-consent';
import { ParamsRouteReuseStrategy } from 'projects/shared/utils/router';
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor } from '../../../shared/helpers';
import { AppInitService, initConfig } from './app-init.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClaimsRegistryPreviewService } from './claims-registry/claims-registry-preview.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeWithConfigModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: ParamsRouteReuseStrategy
    },
    {
      provide: ClaimsRegistryPreviewService
    },
    // {
    //   provide: ErrorHandler,
    //   useValue: GlobalErrorHandler.instance
    // },
    APIS
    //fakeHealthServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
