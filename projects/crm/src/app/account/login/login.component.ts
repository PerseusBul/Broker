import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { emailRegex, existingPasswordRegex } from 'projects/shared/utils/various';
import { finalize, first, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { Message } from 'src/app/_models/message';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class LoginSkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();

  constructor(
    route: ActivatedRoute,
    authenticationService: AuthenticationService,
    router: Router,
    private messengerService: MessengerService
  ) {
    super();

    const targetRoute = route.snapshot.queryParamMap.get('returnUrl');
    if (authenticationService.currentUserValue && authenticationService.currentUserValue.success) {
      router.navigate(['crm/health-policy']);
    }
    const sub = authenticationService.currentUser.subscribe({
      next: (currentUser) => {
        if (currentUser && currentUser.success) {
          router.navigate(['crm/health-policy']);
        } else {
          this.resolve(LoginComponent, { targetRoute: targetRoute });
        }
      },
      error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  @Input() data!: {
    targetRoute: string | null;
  };

  readonly form = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    password: [null, Validators.compose([Validators.required, Validators.pattern(existingPasswordRegex)])],
    captcha: [null, Validators.required]
  });

  loading = false;
  errors: string[] = [];
  readonly subscriptions: Subscription = new Subscription();
  InfoMessages = InfoMessages;

  constructor(private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

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

    this.subscriptions.add(
      this.authenticationService
        .login(fv.username, fv.password, fv.captcha)
        .pipe(
          first(),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: (response) => {
            if (response?.success) {
              const returnUrl = this.data.targetRoute || '/crm/health-policy';
              this.router.navigate([returnUrl]);
            } else {
              this.errors.push(...response.errors!.map((err: any) => err.description ?? 'Възникна грешка'));
            }
          },
          error: (error) => {
            const errorMessage = `${error}`.replace('Error: ', '');
            this.errors.push(errorMessage);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
