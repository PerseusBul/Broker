import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'projects/broker-api';
import { emailRegex } from 'projects/shared/utils/various';
import { finalize, first, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'br-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnDestroy {
  readonly form = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    captcha: [null, Validators.required]
  });

  loading = false;
  errors: string[] = [];
  readonly subscriptions: Subscription = new Subscription();
  InfoMessages = InfoMessages;

  constructor(private fb: FormBuilder, private userService: UsersService, private messengerService: MessengerService) {}

  submit() {
    const fv = this.form.value;
    this.errors = [];

    if (this.form.invalid || this.loading) {
      if (!fv.captcha) {
        this.errors.push(ErrorMessage.IAmNotARobot);
      }

      return;
    }

    this.loading = true;

    const sub = this.userService
      .accountPasswordReset({ email: fv.username, captcha: fv.captcha })
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          if (response?.success) {
            this.messengerService.add(
              new Message(
                'На вашият имейл адрес, ще бъде изпратена инструкция за възстановяване на вашата парола!',
                true,
                10000
              )
            );
          } else {
            this.errors.push(...response.errors!.map((item) => item.description ?? ErrorMessage.TryAgain));
          }
        },
        error: (error) => {
          this.messengerService.add(new Message('Възникна грешка, няма такъв имейл адрес!', false));
        }
      });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
