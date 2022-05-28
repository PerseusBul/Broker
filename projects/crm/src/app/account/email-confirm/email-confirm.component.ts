import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailConfirmationResponse, UsersService } from 'projects/crm-api';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { finalize, first, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class EmailConfirmComponentSkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();
  loading: boolean = false;

  constructor(usersService: UsersService, route: ActivatedRoute, messengerService: MessengerService) {
    super();

    const email = route.snapshot.paramMap.get('email');
    const token = route.snapshot.paramMap.get('token');

    if (!email || !token) {
      messengerService.add(new Message(ErrorMessage.ContactAdminAboutYourAccount, false));
      return;
    }

    this.loading = true;
    const userSub = usersService
      .accountEmailConfirmation(email, token)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (data) => {
          this.resolve(EmailConfirmComponent, { emailConfirmationResponse: data });
        },
        error: (error) => messengerService.add(new Message(ErrorMessage.ContactAdminAboutYourAccount, false))
      });

    this.subscriptions.add(userSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'crm-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit, OnDestroy {
  @Input() data!: {
    emailConfirmationResponse: EmailConfirmationResponse;
  };

  errors: string[] = [];
  success: boolean = false;
  readonly subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private messengerService: MessengerService) {}

  ngOnInit(): void {
    this.success = this.data.emailConfirmationResponse?.success ?? false;
    if (!this.success) {
      this.errors.push(
        ...this.data.emailConfirmationResponse.errors!.map(
          //TODO: redirect to page where user can send another mail confirmation token
          (err) => err?.description ?? 'Възникна проблем! Опитайте отново да пуснете нова заявка за смяна на паролата'
        )
      );
    } else {
      const delay: number = 5000;
      const messages: Message[] = [];
      messages.push(new Message('Поздравления!', true, delay));
      messages.push(new Message('Вашият емейл адрес е успешно потвърден.', true, delay));
      messages.push(new Message('Може да влезете в my.Axiom.', true, delay));
      this.messengerService.next(messages);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
