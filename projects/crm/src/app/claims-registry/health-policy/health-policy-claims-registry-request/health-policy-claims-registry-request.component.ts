import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiomUser, CardDetailsBody, HealthService, IAxiomNom, UsersService } from 'projects/crm-api';
import { INomService, INomVO } from 'projects/shared/components/nom-select/nom-service';
import { egnValidator } from 'projects/shared/validators/account-egn-validator';
import { finalize, first, Subscription } from 'rxjs';
import { ApplicantType } from 'src/app/_enumerations/applicant-types';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { PinType } from 'src/app/_enumerations/pin-type';
import { Message } from 'src/app/_models/message';
import { ApplicantTypesService } from 'src/app/_nomServices/nom-api';
import { PinTypesService } from 'src/app/_nomServices/pin-types.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ClaimsRegistryPreviewService } from '../../claims-registry-preview.service';
import { CardDetailsRequest, HealthPolicyClaimRegistryDateRange } from '../../claims-registry-types';

@Component({
  selector: 'crm-health-policy-claims-registry-request',
  templateUrl: './health-policy-claims-registry-request.component.html',
  styleUrls: ['./health-policy-claims-registry-request.component.scss']
})
export class HealthPolicyClaimsRegistryRequestComponent implements OnInit, OnDestroy {
  readonly form = this.fb.group({
    applicantTypeId: [null, Validators.required],
    pinType: [PinType.EGN, Validators.required],
    pin: [null, Validators.compose([Validators.required, egnValidator()])],
    claimDate: [null, Validators.required]
  });

  loading: boolean = false;
  errors: string[] = [];

  private applicantTypeName: string = '';
  private user?: AxiomUser;

  readonly subscriptions: Subscription = new Subscription();
  pinTypeItems: INomVO<string>[] = [];
  applicantTypesService: INomService<number, () => {}>;
  InfoMessages = InfoMessages;

  maxDate: Date = new Date();
  minDate: Date = new Date(this.maxDate.getFullYear() - 1, this.maxDate.getMonth() - 1);
  isEGN: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private pinTypesService: PinTypesService,
    private claimsRegistryPreviewService: ClaimsRegistryPreviewService,
    private healthService: HealthService,
    private userService: UsersService,
    applicantTypesService: ApplicantTypesService
  ) {
    this.applicantTypesService = applicantTypesService;
  }

  ngOnInit(): void {
    this.togglePinValidators();

    this.subscriptions.add(
      this.userService.userGet().subscribe({
        next: (response) => (this.user = response.user ?? ({} as AxiomUser)),
        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
      })
    );

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
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errors = [];

    const fv = this.form.value;
    const cardDetailsBody: CardDetailsBody = {
      pinType: fv.pinType,
      pin: fv.pin,
      claimDate: fv.claimDate
    };

    this.subscriptions.add(
      this.healthService
        .healthCardDetails(cardDetailsBody)
        .pipe(
          first(),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.messengerService.add(
                new Message('Вашата полица е установена успешно! Попълнете формата на вашата заявка!', true, 3000)
              );
              this.claimsRegistryPreviewService.assignInitialClaimRegistryData(
                fv as CardDetailsRequest,
                response.user!,
                response.insuranceCardNumber!,
                response.packages!,
                response.insuranceTypeCode!,
                this.applicantTypeName,
                this.pinTypeItems,
                this.calculateDateRange(response.beginDate, response.endDate)
              );
              this.router.navigate(['../new'], { relativeTo: this.route });
            } else {
              this.messengerService.next(
                response.errors!.map((item) => new Message(item.description ?? ErrorMessage.TryAgain, false))
              );
            }
          },
          error: (errors) => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
        })
    );
  }

  togglePinValidators() {
    const pinTypeControl = this.form.controls['pinType'];
    const pinControl = this.form.controls['pin'];

    this.subscriptions.add(
      pinTypeControl.valueChanges.subscribe((val: string) => {
        if (val === PinType.EGN) {
          this.isEGN = true;
          pinControl.clearValidators();
          pinControl.setValidators(Validators.compose([Validators.required, egnValidator()]));
          pinControl.updateValueAndValidity();
        } else {
          this.isEGN = false;
          pinControl.clearValidators();
          pinControl.setValidators(Validators.required);
          pinControl.updateValueAndValidity();
        }
      })
    );
  }

  onApplicantTypeChange(applicantType: IAxiomNom) {
    this.applicantTypeName = applicantType?.name;
    const pinTypeControl = this.form.controls['pinType'];
    const pinControl = this.form.controls['pin'];

    if (applicantType.id === ApplicantType.Insured) {
      pinTypeControl.setValue(this.user?.pinType);
      pinControl.setValue(this.user?.pin);
    } else {
      pinTypeControl.setValue(null);
      pinControl.setValue(null);
    }
  }

  calculateDateRange(beginDate?: Date, endDate?: Date): HealthPolicyClaimRegistryDateRange {
    const today = new Date();
    const endRange = new Date(endDate ?? today);

    return { minDate: beginDate ?? today, maxDate: today > endRange ? endRange : today };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
