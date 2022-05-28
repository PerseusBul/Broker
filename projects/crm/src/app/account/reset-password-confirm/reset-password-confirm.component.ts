import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationRequest, UsersService } from 'projects/crm-api';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { passwordLengthInRange } from 'projects/shared/utils/various';
import { passwordValidator } from 'projects/shared/validators/account-password-validator';
import { repeatPasswordValidator } from 'projects/shared/validators/account-repeat-password-validator';
import { finalize, Subscription, take } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class ResetPasswordConfirmSkeletonComponent extends SkeletonComponentBase {
  constructor(route: ActivatedRoute) {
    super();

    const email = route.snapshot.paramMap.get('email');
    const token = route.snapshot.paramMap.get('token');

    this.resolve(ResetPasswordConfirmComponent, {
      emailConfirmationRequest: { email, token, password: '' } as ConfirmationRequest
    });
  }
}

@Component({
  selector: 'crm-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit, OnDestroy {
  @Input() data!: {
    emailConfirmationRequest: ConfirmationRequest;
  };

  readonly form = this.fb.group({
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
    private router: Router,
    private userService: UsersService,
    private messengerService: MessengerService
  ) {}

  ngOnInit(): void {
    if (this.data.emailConfirmationRequest.email === null || this.data.emailConfirmationRequest.token === null) {
      this.messengerService.add(
        new Message('Възникна проблем! Пробвайте да пуснете нова заявка за смяна на паролата', false)
      );
    }
    this.repeatPasswordValidation();
  }

  submit() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errors = [];

    const fv = this.form.value;
    const resetPasswordRequest: ConfirmationRequest = {
      email: this.data.emailConfirmationRequest.email!,
      token: this.data.emailConfirmationRequest.token!,
      password: fv.newPassword
    };

    const sub = this.userService
      .accountPasswordResetConfirmation(resetPasswordRequest)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messengerService.add(
              new Message(
                'Вашата парола е сменена успешно! Можете да влезете с новата парола в приложението!',
                true,
                3000
              )
            );
            this.router.navigate(['/crm/account/login']);
          } else {
            this.errors.push(...response.errors!.map((err) => err?.description ?? 'Възникна грешка'));
          }
        },
        error: (error) => {
          this.messengerService.add(new Message(ErrorMessage.TryAgain, false));
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
