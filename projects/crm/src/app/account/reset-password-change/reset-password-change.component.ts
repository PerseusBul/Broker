import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'projects/crm-api/api/users.service';
import { ChangePasswordRequest } from 'projects/crm-api/model/changePasswordRequest';
import { existingPasswordRegex, passwordLengthInRange } from 'projects/shared/utils/various';
import { passwordValidator } from 'projects/shared/validators/account-password-validator';
import { repeatPasswordValidator } from 'projects/shared/validators/account-repeat-password-validator';
import { finalize, first, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'crm-reset-password-change',
  templateUrl: './reset-password-change.component.html',
  styleUrls: ['./reset-password-change.component.scss']
})
export class ResetPasswordChangeComponent implements OnInit, OnDestroy {
  readonly form = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern(existingPasswordRegex)])],
    newPassword: [
      null,
      Validators.compose([Validators.required, passwordValidator(), Validators.pattern(passwordLengthInRange)])
    ],
    repeatNewPassword: [null]
  });

  loading: boolean = false;
  errors: string[] = [];
  readonly subscriptions: Subscription = new Subscription();
  InfoMessages = InfoMessages;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private messengerService: MessengerService
  ) {}

  ngOnInit(): void {
    this.repeatPasswordValidation();
  }

  submit() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errors = [];

    const fv = this.form.value;
    const newPasswordRequest: ChangePasswordRequest = {
      currentPassword: fv.password,
      newPassword: fv.newPassword
    };

    const sub = this.userService
      .accountPasswordChange(newPasswordRequest)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          if (response?.success) {
            this.messengerService.add(new Message('Вашата парола е сменена успешно!', true, 3000));
            this.router.navigate(['../../health-policy'], { relativeTo: this.route });
          } else {
            this.errors.push(...response?.errors!.map((item) => item.description ?? ErrorMessage.TryAgain));
          }
        },
        error: (errors) => {
          if (errors['NewPassword']) {
            this.errors.push(errors['NewPassword'][0]);
          } else {
            this.messengerService.add(new Message(ErrorMessage.TryAgain, false));
          }
        }
      });

    this.subscriptions.add(sub);
  }

  repeatPasswordValidation() {
    const { repeatNewPassword } = this.form.controls;
    const { newPassword } = this.form.controls;
    repeatNewPassword.setValidators(Validators.compose([Validators.required, repeatPasswordValidator(newPassword)]));
    repeatNewPassword.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
