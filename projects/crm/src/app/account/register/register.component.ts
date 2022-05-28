import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserRequest, UsersService } from 'projects/crm-api';
import { INomVO } from 'projects/shared/components/nom-select/nom-service';
import {
  bulMobPhoneRegex,
  emailRegex,
  insuranceCardRegex,
  nameRegex,
  passwordLengthInRange,
  phoneRegex
} from 'projects/shared/utils/various';
import { egnValidator } from 'projects/shared/validators/account-egn-validator';
import { passwordValidator } from 'projects/shared/validators/account-password-validator';
import { repeatPasswordValidator } from 'projects/shared/validators/account-repeat-password-validator';
import { finalize, first, Subscription, take } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { PinType } from 'src/app/_enumerations/pin-type';
import { Message } from 'src/app/_models/message';
import { PinTypesService } from 'src/app/_nomServices/nom-api';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'crm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  readonly form = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    password: [
      null,
      Validators.compose([Validators.required, passwordValidator(), Validators.pattern(passwordLengthInRange)])
    ],
    repeatPassword: [null],
    firstName: [null, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
    middleName: [null, Validators.pattern(nameRegex)],
    lastName: [null, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)])],
    pinType: [PinType.EGN, Validators.required],
    pin: [null, Validators.compose([Validators.required, egnValidator()])],
    insuranceCardNumber: [null],
    isDataPrivacyAccepted: [null, Validators.requiredTrue],
    isAdvertisingSubscriptionAccepted: [null],
    areGeneralTermsAccepted: [null, Validators.requiredTrue],
    captcha: [null, Validators.required]
  });

  loading = false;
  errors: string[] = [];
  insuranceCardNumberChecked: boolean = false;
  isChecked: boolean = false;
  hasForeignPhoneNumber: boolean = false;
  isEgn: boolean = true;
  subscriptions: Subscription = new Subscription();
  pinTypeItems: INomVO<string>[] = [];
  InfoMessages = InfoMessages;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private pinTypesService: PinTypesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.togglePinValidators();
    this.repeatPasswordValidation();

    this.subscriptions.add(
      this.pinTypesService
        .pinTypes()
        .pipe(first())
        .subscribe((data) => {
          this.pinTypeItems = data;
        })
    );
  }

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

    const createUserRequest: CreateUserRequest = {
      username: fv.username,
      password: fv.password,
      pinType: fv.pinType,
      pin: fv.pin,
      firstName: fv.firstName,
      middleName: fv.middleName,
      lastName: fv.lastName,
      phoneNumber: fv.phoneNumber,
      insuranceNumber: fv.insuranceNumber,
      insuranceCardNumber: fv.insuranceCardNumber,
      isDataPrivacyAccepted: fv.isDataPrivacyAccepted,
      isAdvertisingSubscriptionAccepted: fv.isAdvertisingSubscriptionAccepted ?? false,
      areGeneralTermsAccepted: fv.areGeneralTermsAccepted,
      captcha: fv.captcha
    };

    const sub = this.usersService
      .userRegistration(createUserRequest)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          if (response?.success) {
            let messages: Message[] = [
              new Message('Вие се регистрирахте успешно!', true, 5000),
              new Message('Ще получите емейл с допълнителни инструкции за активация на вашият акаунт!', true, 5000)
            ];
            this.messengerService.next(messages);

            this.router.navigate(['../login'], { relativeTo: this.route });
          } else {
            this.errors.push(...response.errors!.map((err) => err.description ?? 'Възникна грешка'));
          }
        },
        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
      });

    this.subscriptions.add(sub);
  }

  onPhoneCheckboxChange() {
    this.hasForeignPhoneNumber = !this.hasForeignPhoneNumber;

    const { phoneNumber } = this.form.controls;
    if (this.hasForeignPhoneNumber) {
      phoneNumber.setValidators(Validators.compose([Validators.required, Validators.pattern(phoneRegex)]));
      phoneNumber.updateValueAndValidity();
    } else {
      phoneNumber.setValidators(Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)]));
      phoneNumber.updateValueAndValidity();
    }
  }

  onInsuranceCardNumber() {
    this.insuranceCardNumberChecked = !this.insuranceCardNumberChecked;

    const { insuranceCardNumber } = this.form.controls;
    if (this.insuranceCardNumberChecked) {
      insuranceCardNumber.setValidators(
        Validators.compose([Validators.required, Validators.pattern(insuranceCardRegex)])
      );
      insuranceCardNumber.updateValueAndValidity();
    } else {
      insuranceCardNumber.clearValidators();
      insuranceCardNumber.updateValueAndValidity();
    }
  }

  togglePinValidators() {
    const pinTypeControl = this.form.controls['pinType'];
    const pinControl = this.form.controls['pin'];

    const sub = pinTypeControl.valueChanges.subscribe((val: string) => {
      this.isEgn = val === PinType.EGN;
      if (this.isEgn) {
        pinControl.clearValidators();
        pinControl.setValidators(Validators.compose([Validators.required, egnValidator()]));
        pinControl.updateValueAndValidity();
      } else {
        pinControl.clearValidators();
        pinControl.setValidators(Validators.required);
        pinControl.updateValueAndValidity();
      }
    });

    this.subscriptions.add(sub);
  }

  repeatPasswordValidation() {
    const { repeatPassword } = this.form.controls;
    const { password } = this.form.controls;
    repeatPassword.setValidators(Validators.compose([Validators.required, repeatPasswordValidator(password)]));
    repeatPassword.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
