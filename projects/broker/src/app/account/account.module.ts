import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { AccountFormToolsModule } from 'projects/shared/account-form-tools.module';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { SelectFieldModule } from 'projects/shared/components/select-field/select-field.module';
import {
  AccountInfoUpdateComponent,
  AccountInfoUpdateSkeletonComponent
} from './account-info-update/account-info-update.component';
import { AccountRoutingModule } from './account-routing.module';
import { EmailConfirmComponent, EmailConfirmComponentSkeletonComponent } from './email-confirm/email-confirm.component';
import { LoginComponent, LoginSkeletonComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordChangeComponent } from './reset-password-change/reset-password-change.component';
import {
  ResetPasswordConfirmComponent,
  ResetPasswordConfirmSkeletonComponent
} from './reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { environment } from 'src/environments/environment';

const globalSettings: RecaptchaSettings = { siteKey: environment.siteKey };

@NgModule({
  declarations: [
    LoginComponent,
    LoginSkeletonComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordChangeComponent,
    AccountInfoUpdateComponent,
    AccountInfoUpdateSkeletonComponent,
    ResetPasswordConfirmComponent,
    ResetPasswordConfirmSkeletonComponent,
    EmailConfirmComponent,
    EmailConfirmComponentSkeletonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    CommonFormUiModule,
    AccountFormToolsModule,
    NomSelectModule,
    MatCheckboxModule,
    SelectFieldModule,
    MatIconModule,
    MatTooltipModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings
    }
  ]
})
export class AccountModule { }
