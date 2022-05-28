import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserResponse, UpdateUserRequest, UsersService } from 'projects/broker-api';
import { INomVO } from 'projects/shared/components/nom-select/nom-service';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import {
  bulMobPhoneRegex,
  insuranceCardRegex,
  isValidBulMobPhone,
  nameRegex,
  phoneRegex
} from 'projects/shared/utils/various';
import { finalize, first, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { PinType } from 'src/app/_enumerations/pin-type';
import { Message } from 'src/app/_models/message';
import { PinTypesService } from 'src/app/_nomServices/pin-types.service';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class AccountInfoUpdateSkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();

  constructor(usersService: UsersService, messengerService: MessengerService) {
    super();

    const userSub = usersService
      .userGet()
      .pipe(first())
      .subscribe({
        next: (userResponse) => {
          this.resolve(AccountInfoUpdateComponent, {
            userResponse: userResponse
          });
        },
        error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
      });

    this.subscriptions.add(userSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'br-account-info-update',
  templateUrl: './account-info-update.component.html',
  styleUrls: ['./account-info-update.component.scss']
})
export class AccountInfoUpdateComponent implements OnInit, OnDestroy {
  @Input() data!: {
    userResponse: GetUserResponse;
  };

  readonly form = this.fb.group({
    firstName: [null, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
    middleName: [null, Validators.pattern(nameRegex)],
    lastName: [null, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)])],
    pinType: [null],
    pin: [null],
    insuranceCardNumber: [null],
    isAdvertisingSubscriptionAccepted: [null]
  });

  errors: string[] = [];
  insuranceCardNumberChecked: boolean = false;
  hasForeignPhoneNumber: boolean = false;
  successMessage?: string;
  loading: boolean = false;
  subscriptions: Subscription = new Subscription();
  pinTypeItems: INomVO<string>[] = [];
  InfoMessages = InfoMessages;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pinTypesService: PinTypesService,
    private messengerService: MessengerService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.pinTypesService
        .pinTypes()
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.pinTypeItems = data;
          },
          error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
        })
    );

    const user = this.data.userResponse.user;
    if (!user) {
      // Handle errors display
      () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false));
      return;
    }

    this.form.setValue({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      pinType: user.pinType,
      pin: user.pin,
      insuranceCardNumber: user.insuranceCardNumber,
      isAdvertisingSubscriptionAccepted: user.isAdvertisingSubscriptionAccepted
    });

    this.hasForeignPhoneNumber = !isValidBulMobPhone(user.phoneNumber);
    this.insuranceCardNumberChecked = !!user.insuranceCardNumber;

    this.disablePinFields();
    this.setPhoneValidators();
    this.setInsuranceCardNumberValidators();
  }

  submit() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errors = [];

    const fv = this.form.value;
    const userUpdateRequest: UpdateUserRequest = {
      pinType: fv.pinType,
      pin: PinType.EGN,
      firstName: fv.firstName,
      middleName: fv.middleName,
      lastName: fv.lastName,
      phoneNumber: fv.phoneNumber,
      insuranceNumber: undefined, // TODO remove
      insuranceCardNumber: fv.insuranceCardNumber,
      isAdvertisingSubscriptionAccepted: fv.isAdvertisingSubscriptionAccepted
    };

    const sub = this.usersService
      .userUpdate(userUpdateRequest)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messengerService.add(new Message('Вашият профил е обновен успешно', true, 3000));
            this.router.navigate(['../../health-policy'], { relativeTo: this.route });
          } else {
            this.errors.push(...response.errors!.map((err) => err.description ?? 'Възникна грешка'));
          }
        },
        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
      });

    this.subscriptions.unsubscribe();
  }

  onPhoneCheckboxChange() {
    this.hasForeignPhoneNumber = !this.hasForeignPhoneNumber;

    this.setPhoneValidators();
  }

  onInsuranceCardNumber() {
    this.insuranceCardNumberChecked = !this.insuranceCardNumberChecked;

    this.setInsuranceCardNumberValidators();
  }

  disablePinFields() {
    this.form.controls['pinType'].disable();
    this.form.controls['pin'].disable();
  }

  setPhoneValidators() {
    const { phoneNumber } = this.form.controls;
    if (this.hasForeignPhoneNumber) {
      phoneNumber.setValidators(Validators.compose([Validators.required, Validators.pattern(phoneRegex)]));
      phoneNumber.updateValueAndValidity();
    } else {
      phoneNumber.setValidators(Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)]));
      phoneNumber.updateValueAndValidity();
    }
  }

  setInsuranceCardNumberValidators() {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
