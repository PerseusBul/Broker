import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner as fasSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { HealthService, IAxiomNom } from 'projects/crm-api';
import { ClaimDocumentType } from 'projects/crm-api/model/claimDocumentType';
import { INomService, INomVO } from 'projects/shared/components/nom-select/nom-service';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import {
  bulMobPhoneRegex,
  emailRegex,
  fullNameRegex,
  ibanRegex,
  invoiceNumberRegex,
  nameRegex,
  phoneRegex,
  zipCodeRegex
} from 'projects/shared/utils/various';
import { egnValidator } from 'projects/shared/validators/account-egn-validator';
import { first, Subscription } from 'rxjs';
import { ApplicantType } from 'src/app/_enumerations/applicant-types';
import { CommunicationChannel, CommunicationChannels } from 'src/app/_enumerations/communication-channels';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import {
  HealthClaimDocumentFileType,
  HealthClaimDocumentFileTypeName
} from 'src/app/_enumerations/health-claim-document-file-type';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { PinType } from 'src/app/_enumerations/pin-type';
import { Base64File } from 'src/app/_models/base64File';
import { Message } from 'src/app/_models/message';
import { DistrictsService } from 'src/app/_nomServices/districts.service';
import { DocumentsService } from 'src/app/_nomServices/documents.service';
import { ApplicantTypesService, MunicipalitiesService, PaymentTypesService } from 'src/app/_nomServices/nom-api';
import { TownsService } from 'src/app/_nomServices/towns.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ClaimsRegistryPreviewService } from '../../claims-registry-preview.service';
import {
  DocData,
  HealthPolicyClaimRegistryForm,
  HealthPolicyClaimRegistryUtils,
  HealthPolicyDocumentFiles,
  LocationFilters,
  MaxAllFilesSizeMB,
  MedicalDocsData,
  NomSelectVarNames,
  RequiredFileTypes
} from '../../claims-registry-types';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicyClaimsRegistryNewSkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();

  constructor(
    healthService: HealthService,
    messengerService: MessengerService,
    claimsRegistryPreviewService: ClaimsRegistryPreviewService
  ) {
    super();

    if (claimsRegistryPreviewService.isInitial) {
      this.subscriptions.add(
        healthService
          .healthAccidentTypes()
          .pipe(first())
          .subscribe({
            next: (accidentTypes: IAxiomNom[]) => {
              claimsRegistryPreviewService.nextAccidentTypes(accidentTypes);

              this.resolve(HealthPolicyClaimsRegistryNewComponent, {
                claimRegistry: claimsRegistryPreviewService.getFormData(),
                claimRegistryUtils: claimsRegistryPreviewService.getClaimRegistryUtils(),
                documentFiles: claimsRegistryPreviewService.getDocumentFiles()
              });
            },
            error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
          })
      );
    } else {
      this.resolve(HealthPolicyClaimsRegistryNewComponent, {
        claimRegistry: claimsRegistryPreviewService.getFormData(),
        claimRegistryUtils: claimsRegistryPreviewService.getClaimRegistryUtils(),
        documentFiles: claimsRegistryPreviewService.getDocumentFiles()
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'crm-health-policy-claims-registry-new',
  templateUrl: './health-policy-claims-registry-new.component.html',
  styleUrls: ['./health-policy-claims-registry-new.component.scss']
})
export class HealthPolicyClaimsRegistryNewComponent implements OnInit, OnDestroy {
  @Input() data!: {
    claimRegistry: HealthPolicyClaimRegistryForm;
    claimRegistryUtils: HealthPolicyClaimRegistryUtils;
    documentFiles: HealthPolicyDocumentFiles;
  };

  form!: FormGroup;
  readonly fasSpinner = fasSpinner;
  loading: boolean = false;
  errors: string[] = [];
  isChecked: boolean = false;
  hasForeignPhoneNumber: boolean = false;
  applicantHasForeignPhoneNumber: boolean = false;
  hasApplicant: boolean = false;
  claimBigAmount: boolean = false;
  allFilesSize: number = 0;
  maxAllFilesSize: number = MaxAllFilesSizeMB;
  claimRegistryUtils: HealthPolicyClaimRegistryUtils = this.claimsRegistryPreviewService.getClaimRegistryUtils();
  districtsFilter?: number;
  municipalitiesFilter?: number;
  applicantDistrictsFilter?: number;
  applicantMunicipalitiesFilter?: number;

  nomSelectVarNames?: NomSelectVarNames = this.claimRegistryUtils.nomSelectVarNames;

  subscriptions: Subscription = new Subscription();
  InfoMessages = InfoMessages;
  HealthClaimDocumentFileType = HealthClaimDocumentFileType;
  HealthClaimDocumentFileTypeName = HealthClaimDocumentFileTypeName;
  CommunicationChannel = CommunicationChannel;

  maxDate!: Date;
  minDate!: Date;

  pinTypeItems: INomVO<string>[] = [];
  applicantTypesService: INomService<number, () => {}>;
  districtsService: INomService<number, () => {}>;
  municipalitiesService: INomService<number, () => {}>;
  townsService: INomService<number, () => {}>;
  paymentTypesService: INomService<number, () => {}>;
  communicationChannels: INomVO<number>[] = CommunicationChannels;
  RequiredFileTypes: string = RequiredFileTypes;
  documentTypes: ClaimDocumentType[] = [];
  files: HealthPolicyDocumentFiles = {
    invoiceFiles: [],
    receiptFiles: [],
    ambulatoryFiles: [],
    labTestFiles: [],
    cardTherapyFiles: []
  };
  docData: DocData = {
    number: null,
    date: null,
    description: null
  };
  medicalDocsData: MedicalDocsData = {
    invoiceFile: { ...this.docData },
    receiptFile: { ...this.docData },
    ambulatoryFile: { ...this.docData },
    labTestFile: { ...this.docData },
    cardTherapyFile: { ...this.docData }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private claimsRegistryPreviewService: ClaimsRegistryPreviewService,
    private documentService: DocumentsService,
    applicantTypesService: ApplicantTypesService,
    districtsService: DistrictsService,
    municipalitiesService: MunicipalitiesService,
    townsService: TownsService,
    paymentTypesService: PaymentTypesService
  ) {
    this.applicantTypesService = applicantTypesService;
    this.districtsService = districtsService;
    this.municipalitiesService = municipalitiesService;
    this.townsService = townsService;
    this.paymentTypesService = paymentTypesService;
  }

  ngOnInit(): void {
    this.setComponentVariables();
    this.applyFormValues();
    this.togglePinValidators();
    this.toggleHolderPinValidators();
    this.manageLocationFieldsAccessAndFilters();
    this.handleBigAmountRegistryClaim();
    this.onApplicantTypeChange();
  }

  submit() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errors = [];

    this.enableClaimRegistryPresetValueFields();
    const fv = this.form.value;

    const healthPolicyClaimsRegistryData: HealthPolicyClaimRegistryForm = {
      applicantTypeId: fv.applicantTypeId,
      applicantFirstName: fv.applicantFirstName,
      applicantMiddleName: fv.applicantMiddleName,
      applicantLastName: fv.applicantLastName,
      applicantPinType: fv.applicantPinType,
      applicantPin: fv.applicantPin,
      applicantDistrict: fv.applicantDistrict,
      applicantMunicipality: fv.applicantMunicipality,
      applicantTownId: fv.applicantTownId,
      applicantAddress: fv.applicantAddress,
      applicantZipCode: fv.applicantZipCode,
      applicantPhoneNumber: fv.applicantPhoneNumber,
      applicantEmail: fv.applicantEmail,
      firstName: fv.firstName,
      middleName: fv.middleName,
      lastName: fv.lastName,
      pinType: fv.pinType,
      pin: fv.pin,
      district: fv.district,
      municipality: fv.municipality,
      townId: fv.townId,
      address: fv.address,
      zipCode: fv.zipCode,
      phoneNumber: fv.phoneNumber,
      email: fv.email,
      insuranceCardNumber: fv.insuranceCardNumber,
      packageCode: fv.packageCode,
      claimReasonId: fv.claimReasonId,
      claimDate: fv.claimDate,
      claimAmount: fv.claimAmount,
      note: fv.note,
      paymentTypeId: fv.paymentTypeId,
      iban: fv.iban.replace(/[\s]/g, ''),
      accountHolder: fv.accountHolder,
      userTypeId: fv.userTypeId,
      accountHolderPinType: fv.accountHolderPinType,
      accountHolderPin: fv.accountHolderPin,
      invoiceNumber: fv.invoiceNumber,
      invoiceDate: fv.invoiceDate,
      preferredCommunicationChannel: fv.preferredCommunicationChannel
    };

    this.medicalDocsData.ambulatoryFile.number = fv.ambulatoryDocNumber;
    this.medicalDocsData.ambulatoryFile.date = fv.ambulatoryDocDate;
    this.medicalDocsData.invoiceFile.number = fv.invoiceDocNumber;
    this.medicalDocsData.invoiceFile.date = fv.invoiceDocDate;
    this.medicalDocsData.receiptFile.number = fv.receiptDocNumber;
    this.medicalDocsData.receiptFile.date = fv.receiptDocDate;
    this.medicalDocsData.labTestFile.number = fv.labTestDocNumber;
    this.medicalDocsData.labTestFile.date = fv.labTestDocDate;
    this.medicalDocsData.cardTherapyFile.number = fv.cardTherapyDocNumber;
    this.medicalDocsData.cardTherapyFile.date = fv.cardTherapyDocDate;

    this.claimsRegistryPreviewService.nextFormData(healthPolicyClaimsRegistryData);
    this.claimsRegistryPreviewService.nextNomSelectVarNames(this.nomSelectVarNames!);
    const filters: LocationFilters = {
      applicantDistrictsFilter: this.applicantDistrictsFilter,
      applicantMunicipalitiesFilter: this.applicantMunicipalitiesFilter,
      districtsFilter: this.districtsFilter,
      municipalitiesFilter: this.municipalitiesFilter
    };

    this.claimsRegistryPreviewService.nextLocationFilters(filters);
    this.claimsRegistryPreviewService.nextDocumentFiles(this.files);
    this.claimsRegistryPreviewService.nextDocumentTypes(this.documentTypes);
    this.claimsRegistryPreviewService.nextMedicalDocsData(this.medicalDocsData);
    this.router.navigate(['preview'], { relativeTo: this.route });
    this.claimsRegistryPreviewService.isInitial = false;
    this.loading = false; // Use loading just in case
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

  onApplicantPhoneCheckboxChange() {
    this.applicantHasForeignPhoneNumber = !this.applicantHasForeignPhoneNumber;

    const { applicantPhoneNumber } = this.form.controls;
    if (this.applicantHasForeignPhoneNumber) {
      applicantPhoneNumber.setValidators(Validators.compose([Validators.required, Validators.pattern(phoneRegex)]));
      applicantPhoneNumber.updateValueAndValidity();
    } else {
      applicantPhoneNumber.setValidators(
        Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)])
      );
      applicantPhoneNumber.updateValueAndValidity();
    }
  }

  onFilesSelected(event: any, documentTypeId: number) {
    const selectedFiles = [...(event as Base64File[])];
    if (documentTypeId === HealthClaimDocumentFileType.AmbulatoryFile) {
      this.files.ambulatoryFiles = selectedFiles;
      const ambulatoryDocNumberControl = this.form.controls['ambulatoryDocNumber'];
      const ambulatoryDocDateControl = this.form.controls['ambulatoryDocDate'];

      this.setDocDataValidators(
        ambulatoryDocNumberControl as FormControl,
        ambulatoryDocDateControl as FormControl,
        this.files.ambulatoryFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.InvoiceFile) {
      this.files.invoiceFiles = selectedFiles;
      const invoiceDocNumberControl = this.form.controls['invoiceDocNumber'];
      const invoiceDocDateControl = this.form.controls['invoiceDocDate'];

      this.setDocDataValidators(
        invoiceDocNumberControl as FormControl,
        invoiceDocDateControl as FormControl,
        this.files.invoiceFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.ReceiptFile) {
      this.files.receiptFiles = selectedFiles;
      const receiptDocNumberControl = this.form.controls['receiptDocNumber'];
      const receiptDocDateControl = this.form.controls['receiptDocDate'];

      this.setDocDataValidators(
        receiptDocNumberControl as FormControl,
        receiptDocDateControl as FormControl,
        this.files.receiptFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.LabTestFile) {
      this.files.labTestFiles = selectedFiles;
      const labTestDocNumberControl = this.form.controls['labTestDocNumber'];
      const labTestDocDateControl = this.form.controls['labTestDocDate'];

      this.setDocDataValidators(
        labTestDocNumberControl as FormControl,
        labTestDocDateControl as FormControl,
        this.files.labTestFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.CardTherapyFile) {
      this.files.cardTherapyFiles = selectedFiles;
      const cardTherapyDocNumberControl = this.form.controls['cardTherapyDocNumber'];
      const cardTherapyDocControl = this.form.controls['cardTherapyDocDate'];

      this.setDocDataValidators(
        cardTherapyDocNumberControl as FormControl,
        cardTherapyDocControl as FormControl,
        this.files.cardTherapyFiles.length > 0
      );
    }

    this.allFilesSize = Object.values(this.files)
      .flat()
      .map((f) => f.fileSize)
      .reduce((prev, curr) => prev + curr, 0);
  }

  private togglePinValidators() {
    const pinTypeControl = this.form.controls['pinType'];
    const pinControl = this.form.controls['pin'];

    const sub = pinTypeControl.valueChanges.subscribe((val: string) => {
      if (val === PinType.EGN) {
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

  private toggleHolderPinValidators() {
    const accountHolderPinTypeControl = this.form.controls['accountHolderPinType'];
    const accountHolderPinControl = this.form.controls['accountHolderPin'];

    const sub = accountHolderPinTypeControl.valueChanges.subscribe((val: string) => {
      if (val === PinType.EGN) {
        accountHolderPinControl.clearValidators();
        accountHolderPinControl.setValidators(Validators.compose([Validators.required, egnValidator()]));
        accountHolderPinControl.updateValueAndValidity();
      } else {
        accountHolderPinControl.clearValidators();
        accountHolderPinControl.setValidators(Validators.required);
        accountHolderPinControl.updateValueAndValidity();
      }
    });

    this.subscriptions.add(sub);
  }

  private enableClaimRegistryPresetValueFields() {
    const controls = this.form.controls;
    const {
      applicantTypeId,
      applicantPinType,
      applicantPin,
      pinType,
      pin,
      claimDate,
      paymentTypeId,
      insuranceCardNumber
    } = controls;

    applicantTypeId.enable();
    applicantPinType.enable();
    applicantPin.enable();
    claimDate.enable();
    paymentTypeId.enable();
    pinType.enable();
    pin.enable();
    insuranceCardNumber.enable();
  }

  private manageLocationFieldsAccessAndFilters() {
    const controls = this.form.controls;
    const { applicantDistrict, applicantMunicipality, applicantTownId, district, municipality, townId } = controls;

    if (this.hasApplicant) {
      if (!applicantDistrict.value) {
        applicantMunicipality.reset();
        applicantMunicipality.disable();
      }

      if (!applicantMunicipality.value) {
        applicantTownId.reset();
        applicantTownId.disable();
      }

      this.subscriptions.add(
        applicantDistrict.valueChanges.subscribe((val) => {
          if (val && applicantMunicipality.disabled) {
            applicantMunicipality.enable();
            applicantMunicipality.reset();
          }

          applicantMunicipality.reset();
          this.applicantDistrictsFilter = applicantDistrict.value;

          applicantTownId.reset();
          applicantTownId.disable();
          this.applicantMunicipalitiesFilter = undefined;

          if (!val) {
            applicantMunicipality.disable();
            this.applicantDistrictsFilter = undefined;
          }
        })
      );

      this.subscriptions.add(
        applicantMunicipality.valueChanges.subscribe((val) => {
          if (val && applicantTownId.disabled) {
            applicantTownId.enable();
          }

          applicantTownId.reset();
          this.applicantMunicipalitiesFilter = applicantMunicipality.value;

          if (!val && applicantTownId.enabled) {
            applicantTownId.disable();
            this.applicantMunicipalitiesFilter = undefined;
          }
        })
      );
    }

    if (!district.value) {
      municipality.reset();
      municipality.disable();
    }

    if (!municipality.value) {
      townId.reset();
      townId.disable();
    }

    this.subscriptions.add(
      district.valueChanges.subscribe((val) => {
        if (municipality.disabled) {
          municipality.enable();
        }

        municipality.reset();
        this.districtsFilter = district.value;

        townId.reset();
        townId.disable();
        this.municipalitiesFilter = undefined;

        if (!val) {
          municipality.disable();
          this.districtsFilter = undefined;
        }
      })
    );

    this.subscriptions.add(
      municipality.valueChanges.subscribe((val) => {
        if (townId.disabled) {
          townId.enable();
        }

        townId.reset();
        this.municipalitiesFilter = municipality.value;

        if (!val) {
          townId.disable();
          this.municipalitiesFilter = undefined;
        }
      })
    );
  }

  private applyFormValues() {
    const claimRegistry: HealthPolicyClaimRegistryForm = this.data.claimRegistry;

    this.form = this.fb.group({
      applicantTypeId: [{ value: claimRegistry.applicantTypeId, disabled: true }, Validators.required],

      applicantFirstName: [
        claimRegistry.applicantFirstName,
        this.hasApplicant ? Validators.compose([Validators.required, Validators.pattern(nameRegex)]) : null
      ],
      applicantMiddleName: [
        claimRegistry.applicantMiddleName,
        this.hasApplicant ? Validators.pattern(nameRegex) : null
      ],
      applicantLastName: [
        claimRegistry.applicantLastName,
        this.hasApplicant ? Validators.compose([Validators.required, Validators.pattern(nameRegex)]) : null
      ],
      applicantPinType: [
        { value: claimRegistry.applicantPinType, disabled: true },
        this.hasApplicant ? Validators.required : null
      ],
      applicantPin: [
        { value: claimRegistry.applicantPin, disabled: true },
        this.hasApplicant ? Validators.compose([Validators.required, egnValidator()]) : null
      ],
      applicantDistrict: [claimRegistry.applicantDistrict, this.hasApplicant ? Validators.required : null],
      applicantMunicipality: [claimRegistry.applicantMunicipality, this.hasApplicant ? Validators.required : null],
      applicantTownId: [claimRegistry.applicantTownId, this.hasApplicant ? Validators.required : null],
      applicantAddress: [claimRegistry.applicantAddress, this.hasApplicant ? Validators.required : null],
      applicantZipCode: [claimRegistry.applicantZipCode, this.hasApplicant ? Validators.required : null],
      applicantPhoneNumber: [
        claimRegistry.applicantPhoneNumber,
        this.hasApplicant ? Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)]) : null
      ],
      applicantEmail: [
        claimRegistry.applicantEmail,
        this.hasApplicant ? Validators.compose([Validators.required, Validators.pattern(emailRegex)]) : null
      ],

      firstName: [claimRegistry.firstName, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
      middleName: [claimRegistry.middleName, Validators.pattern(nameRegex)],
      lastName: [claimRegistry.lastName, Validators.compose([Validators.required, Validators.pattern(nameRegex)])],
      pinType: [{ value: claimRegistry.pinType, disabled: true }, Validators.required],
      pin: [{ value: claimRegistry.pin, disabled: true }, Validators.compose([Validators.required, egnValidator()])],
      district: [claimRegistry.district, Validators.required],
      municipality: [claimRegistry.municipality, Validators.required],
      townId: [claimRegistry.townId, Validators.required],
      address: [claimRegistry.address, Validators.required],
      zipCode: [claimRegistry.zipCode, Validators.compose([Validators.required, Validators.pattern(zipCodeRegex)])],
      phoneNumber: [
        claimRegistry.phoneNumber,
        Validators.compose([Validators.required, Validators.pattern(bulMobPhoneRegex)])
      ],
      email: [claimRegistry.email, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      insuranceCardNumber: [{ value: claimRegistry.insuranceCardNumber, disabled: true }, Validators.required],

      packageCode: [claimRegistry.packageCode, Validators.required],
      claimReasonId: [claimRegistry.claimReasonId, Validators.required],
      claimDate: [{ value: claimRegistry.claimDate, disabled: true }, Validators.required],
      note: [claimRegistry.note, Validators.required],

      // May it is good idea to check if there any amount left to the limit - text in placeholder
      claimAmount: [claimRegistry.claimAmount, Validators.required],
      preferredCommunicationChannel: [
        claimRegistry.preferredCommunicationChannel ?? this.CommunicationChannel.Email,
        Validators.required
      ],

      paymentTypeId: [{ value: claimRegistry.paymentTypeId, disabled: true }, Validators.required],
      iban: [claimRegistry.iban, Validators.compose([Validators.required, Validators.pattern(ibanRegex)])],
      accountHolder: [
        claimRegistry.accountHolder,
        Validators.compose([Validators.required, Validators.pattern(fullNameRegex)])
      ],
      userTypeId: [claimRegistry.userTypeId],
      accountHolderPinType: [claimRegistry.accountHolderPinType ?? PinType.EGN, Validators.required],
      accountHolderPin: [claimRegistry.accountHolderPin, Validators.compose([Validators.required, egnValidator()])],

      invoiceNumber: [
        claimRegistry.invoiceNumber,
        Validators.compose([Validators.required, Validators.pattern(invoiceNumberRegex)])
      ],
      // Is there any validation requirements
      invoiceDate: [claimRegistry.invoiceDate, Validators.required],

      ambulatoryDocNumber: [
        this.medicalDocsData.ambulatoryFile.number,
        this.files.ambulatoryFiles.length > 0 ? Validators.required : null
      ],
      ambulatoryDocDate: [
        this.medicalDocsData.ambulatoryFile.date,
        this.files.ambulatoryFiles.length > 0 ? Validators.required : null
      ],

      invoiceDocNumber: [
        this.medicalDocsData.invoiceFile.number,
        this.files.invoiceFiles.length > 0 ? Validators.required : null
      ],
      invoiceDocDate: [
        this.medicalDocsData.invoiceFile.date,
        this.files.invoiceFiles.length > 0 ? Validators.required : null
      ],

      receiptDocNumber: [
        this.medicalDocsData.receiptFile.number,
        this.files.receiptFiles.length > 0 ? Validators.required : null
      ],
      receiptDocDate: [
        this.medicalDocsData.receiptFile.date,
        this.files.receiptFiles.length > 0 ? Validators.required : null
      ],

      labTestDocNumber: [
        this.medicalDocsData.labTestFile.number,
        this.files.labTestFiles.length > 0 ? Validators.required : null
      ],
      labTestDocDate: [
        this.medicalDocsData.labTestFile.date,
        this.files.labTestFiles.length > 0 ? Validators.required : null
      ],

      cardTherapyDocNumber: [
        this.medicalDocsData.cardTherapyFile.number,
        this.files.cardTherapyFiles.length > 0 ? Validators.required : null
      ],
      cardTherapyDocDate: [
        this.medicalDocsData.cardTherapyFile.date,
        this.files.cardTherapyFiles.length > 0 ? Validators.required : null
      ]
    });
  }

  private setComponentVariables() {
    this.hasApplicant = this.claimsRegistryPreviewService.hasApplicant;
    this.pinTypeItems = this.claimRegistryUtils.pinTypeItems!;
    this.minDate = this.claimRegistryUtils.dateRange?.minDate ?? new Date();
    this.maxDate = this.claimRegistryUtils.dateRange?.maxDate ?? new Date();

    if (this.claimsRegistryPreviewService.isInitial) {
      const insuranceTypeCode = this.claimRegistryUtils.insuranceTypeCode;
      this.subscriptions.add(
        this.documentService
          .getClaimDocumentTypesByInsuranceType(insuranceTypeCode!)
          .pipe(first())
          .subscribe((data) => {
            this.documentTypes = data?.claimDocumentTypes ?? [];
          })
      );
    }

    if (!this.claimsRegistryPreviewService.isInitial) {
      const filters = this.data.claimRegistryUtils.locationFilters;

      this.applicantDistrictsFilter = filters?.applicantDistrictsFilter;
      this.applicantMunicipalitiesFilter = filters?.applicantMunicipalitiesFilter;
      this.districtsFilter = filters?.districtsFilter;
      this.municipalitiesFilter = filters?.municipalitiesFilter;

      this.files = {
        ...this.data.documentFiles
      };

      this.documentTypes = this.data.claimRegistryUtils.documentTypes ?? [];
      this.medicalDocsData = this.data.claimRegistryUtils.medicalDocsData ?? ({} as MedicalDocsData);
    }
  }

  private handleBigAmountRegistryClaim() {
    this.form?.controls['claimAmount']?.valueChanges.subscribe((amount) => (this.claimBigAmount = amount > 5000));
  }

  onApplicantDistrictChange(applicantDistrict: IAxiomNom) {
    this.nomSelectVarNames!.applicantDistrictName = applicantDistrict?.name;
  }

  onApplicanMunicipalityChange(applicantMunicipality: IAxiomNom) {
    this.nomSelectVarNames!.applicantMunicipalityName = applicantMunicipality?.name;
  }

  onApplicanTownChange(applicantTown: IAxiomNom) {
    this.nomSelectVarNames!.applicantTownName = applicantTown?.name;
  }

  onDistrictChange(district: IAxiomNom) {
    this.nomSelectVarNames!.districtName = district?.name;
  }

  onMunicipalityChange(municipality: IAxiomNom) {
    this.nomSelectVarNames!.municipalityName = municipality?.name;
  }

  onTownChange(town: IAxiomNom) {
    this.nomSelectVarNames!.townName = town?.name;
  }

  getFileMaxSize(fileType: HealthClaimDocumentFileType): number {
    return this.documentTypes?.find((doc) => doc.externalDocumentTypeId === fileType)?.maxFileSize ?? 6;
  }

  private setDocDataValidators(numberControl: FormControl, dateControl: FormControl, hasFile: boolean) {
    if (hasFile) {
      numberControl.setValidators(Validators.required);
      numberControl.updateValueAndValidity();

      dateControl.setValidators(Validators.required);
      dateControl.updateValueAndValidity();
    } else {
      numberControl.clearValidators();
      numberControl.updateValueAndValidity();

      dateControl.clearValidators();
      dateControl.updateValueAndValidity();
    }
  }

  private onApplicantTypeChange() {
    const claimRegistry: HealthPolicyClaimRegistryForm = this.data.claimRegistry;

    const userTypeId = this.form.controls['userTypeId'];
    const accountHolderPinTypeControl = this.form.controls['accountHolderPinType'];
    const accountHolderPinControl = this.form.controls['accountHolderPin'];
    const accountHolder = this.form.controls['accountHolder'];

    this.subscriptions.add(
      userTypeId.valueChanges.subscribe((val) => {
        if (!val) {
          accountHolderPinTypeControl.setValue(null);
          accountHolderPinControl.setValue(null);
          accountHolder.setValue(null);
        } else if (val === ApplicantType.Insured) {
          accountHolderPinTypeControl.setValue(claimRegistry.pinType);
          accountHolderPinControl.setValue(claimRegistry.pin);
          accountHolder.setValue(
            this.claimsRegistryPreviewService.formatFullName(
              claimRegistry.firstName,
              claimRegistry.middleName,
              claimRegistry.lastName
            )
          );
        } else {
          accountHolderPinTypeControl.setValue(claimRegistry.applicantPinType);
          accountHolderPinControl.setValue(claimRegistry.applicantPin);
          accountHolder.setValue(
            this.claimsRegistryPreviewService.formatFullName(
              claimRegistry.applicantFirstName,
              claimRegistry.applicantMiddleName,
              claimRegistry.applicantLastName
            )
          );
        }
      })
    );
  }

  @HostListener('window:load')
  public redirectOnReload() {
    this.claimsRegistryPreviewService.redirectOnReload(this.router, 'crm/claims-registry/health-policy/request');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
