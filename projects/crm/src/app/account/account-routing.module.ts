import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/shared/helpers';
import { AccountInfoUpdateSkeletonComponent } from './account-info-update/account-info-update.component';
import { EmailConfirmComponentSkeletonComponent } from './email-confirm/email-confirm.component';
import { LoginSkeletonComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordChangeComponent } from './reset-password-change/reset-password-change.component';
import { ResetPasswordConfirmSkeletonComponent } from './reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginSkeletonComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-change', component: ResetPasswordChangeComponent, canActivate: [AuthGuard] },
  { path: 'info-update', component: AccountInfoUpdateSkeletonComponent, canActivate: [AuthGuard] },
  { path: 'reset-password-confirm/email/:email/token/:token', component: ResetPasswordConfirmSkeletonComponent },
  { path: 'email-confirm/email/:email/token/:token', component: EmailConfirmComponentSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
