import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AxiomUser,
  CreateClaimRequest,
  HealthMedicalDocument,
  HealthMedicalDocumentFile,
  IAxiomNom,
  StringIAxiomNom
} from 'projects/crm-api';
import { ClaimDocumentType } from 'projects/crm-api/model/claimDocumentType';
import { INomVO } from 'projects/shared/components/nom-select/nom-service';
import { formatDate } from 'projects/shared/utils/date';
import { BehaviorSubject } from 'rxjs';
import { ApplicantType } from '../_enumerations/applicant-types';
import { CommunicationChannels } from '../_enumerations/communication-channels';
import { HealthClaimDocumentFileType } from '../_enumerations/health-claim-document-file-type';
import { PaymentType } from '../_enumerations/payment-types';
import { PinType, PinTypeName } from '../_enumerations/pin-type';
import {
  CardDetailsRequest,
  HealthPolicyClaimRegistryDateRange,
  HealthPolicyClaimRegistryForm,
  HealthPolicyClaimRegistryUtils,
  HealthPolicyClaimsRegistry,
  HealthPolicyDocumentFiles,
  LocationFilters,
  MedicalDocsData,
  NomSelectVarNames
} from './claims-registry-types';

Injectable();
export class ClaimsRegistryPreviewService {
  private healthPolicyClaimsRegistryPreviewDataContainer: BehaviorSubject<HealthPolicyClaimRegistryForm> =
    new BehaviorSubject({} as HealthPolicyClaimRegistryForm);
  private claimRegistryUtilsContainer: BehaviorSubject<HealthPolicyClaimRegistryUtils> = new BehaviorSubject(
    {} as HealthPolicyClaimRegistryUtils
  );
  private healthPolicyDocumentFilesContainer: BehaviorSubject<HealthPolicyDocumentFiles> = new BehaviorSubject(
    {} as HealthPolicyDocumentFiles
  );

  isInitial = true;
  hasApplicant = false;

  nextFormData(data: HealthPolicyClaimRegistryForm) {
    this.healthPolicyClaimsRegistryPreviewDataContainer.next(data);
  }

  getFormData(): HealthPolicyClaimRegistryForm {
    return this.healthPolicyClaimsRegistryPreviewDataContainer.getValue();
  }

  nextClaimRegistryUtils(accidentTypes: IAxiomNom[], packages: StringIAxiomNom[], filters: LocationFilters) {
    const value: HealthPolicyClaimRegistryUtils = {
      accidentTypes: accidentTypes,
      policyPackages: packages,
      locationFilters: filters
    };

    this.claimRegistryUtilsContainer.next(value);
  }

  getClaimRegistryUtils(): HealthPolicyClaimRegistryUtils {
    return this.claimRegistryUtilsContainer.getValue();
  }

  nextPolicyPackages(packages: StringIAxiomNom[]) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.policyPackages = packages;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextAccidentTypes(accidentTypes: IAxiomNom[]) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.accidentTypes = accidentTypes;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextLocationFilters(filters: LocationFilters) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.locationFilters = filters;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextNomSelectVarNames(names: NomSelectVarNames) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.nomSelectVarNames = names;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextInsuranceTypeCode(type: string) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.insuranceTypeCode = type;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextDocumentTypes(documentTypes: ClaimDocumentType[]) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.documentTypes = documentTypes;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextMedicalDocsData(medicalDocsData: MedicalDocsData) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.medicalDocsData = medicalDocsData;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextPinTypeItems(pinTypeItems: INomVO<string>[]) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.pinTypeItems = pinTypeItems;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextDateRange(dateRange: HealthPolicyClaimRegistryDateRange) {
    const value: HealthPolicyClaimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    value.dateRange = dateRange;

    this.claimRegistryUtilsContainer.next(value);
  }

  nextDocumentFiles(files: HealthPolicyDocumentFiles) {
    this.healthPolicyDocumentFilesContainer.next(files);
  }

  getDocumentFiles(): HealthPolicyDocumentFiles {
    return this.healthPolicyDocumentFilesContainer.getValue();
  }

  setHealthPolicyClaimPreviewData(): HealthPolicyClaimsRegistry {
    const claimRegistry = this.healthPolicyClaimsRegistryPreviewDataContainer.getValue();
    const claimRegistryUtils = this.claimRegistryUtilsContainer.getValue();
    const documentFiles = this.healthPolicyDocumentFilesContainer.getValue();

    const previewTemplateData: HealthPolicyClaimsRegistry = {
      insuredPerson: {
        Име: claimRegistry.firstName,
        Презиме: claimRegistry.middleName,
        Фамилия: claimRegistry.lastName,
        'Вид идентификатор': PinTypeName[claimRegistry.pinType as PinType],
        Идентификатор: claimRegistry.pin,
        Област: claimRegistryUtils.nomSelectVarNames?.districtName?.toUpperCase(),
        Община: claimRegistryUtils.nomSelectVarNames?.municipalityName,
        Град: claimRegistryUtils.nomSelectVarNames?.townName,
        Адрес: claimRegistry.address,
        'Пощенски код': claimRegistry.zipCode,
        Телефон: claimRegistry.phoneNumber,
        Имейл: claimRegistry.email,
        'Номер на здравна карта': claimRegistry.insuranceCardNumber
      },
      claim: {
        'Вид на събитието': claimRegistryUtils.policyPackages?.find(
          (p) => p.id.toString() === claimRegistry.packageCode
        )?.name,
        'Причина за събитието': claimRegistryUtils.accidentTypes?.find((acc) => acc.id === claimRegistry.claimReasonId!)
          ?.name,
        'Дата на събитието': `${formatDate(claimRegistry.claimDate!, 'dd.MM.yyyy')} г.`,
        'Кратко описание на събитието': claimRegistry.note,
        'Претендирана сума': `${claimRegistry.claimAmount} лв`,
        'Предпочитан начин за комуникация': CommunicationChannels.filter(
          (ch) => ch.id === claimRegistry.preferredCommunicationChannel
        )[0].name
      },
      bankPayment: {
        'Начин на плащане': 'Банков път',
        IBAN: claimRegistry.iban?.replace(/[\s]/g, ''),
        'Вид идентификатор на титуляра': PinTypeName[claimRegistry.accountHolderPinType as PinType],
        'Идентификатор на титуляра': claimRegistry.accountHolderPin,
        'Три имена на титуляра': claimRegistry.accountHolder
      },
      invoice: {
        'Номер на фактура': claimRegistry.invoiceNumber,
        'Дата на фактура': `${formatDate(claimRegistry.invoiceDate!, 'dd.MM.yyyy')} г.`
      },
      documentFiles: {
        'Амбулаторен лист / Епикриза': documentFiles.ambulatoryFiles.map((f) => f.fileName).join(', '),
        Фактура: documentFiles.invoiceFiles.map((f) => f.fileName).join(', '),
        'Фискален бон': documentFiles.receiptFiles.map((f) => f.fileName).join(', '),
        'Резултати от изследвания': documentFiles.labTestFiles.map((f) => f.fileName).join(', '),
        'Карта с физиотерапевтични процедури': documentFiles.cardTherapyFiles.map((f) => f.fileName).join(', ')
      }
    };

    if (this.hasApplicant) {
      previewTemplateData.applicant = {
        Заявител: claimRegistryUtils.nomSelectVarNames!.applicantTypeName,
        Име: claimRegistry.applicantFirstName,
        Презиме: claimRegistry.applicantMiddleName,
        Фамилия: claimRegistry.applicantLastName,
        'Вид идентификатор': PinTypeName[claimRegistry.applicantPinType as PinType],
        Идентификатор: claimRegistry.applicantPin,
        Област: claimRegistryUtils.nomSelectVarNames!.applicantDistrictName?.toUpperCase(),
        Община: claimRegistryUtils.nomSelectVarNames!.applicantMunicipalityName,
        Град: claimRegistryUtils.nomSelectVarNames!.applicantTownName,
        Адрес: claimRegistry.applicantAddress,
        'Пощенски код': claimRegistry.applicantZipCode,
        Телефон: claimRegistry.applicantPhoneNumber,
        Имейл: claimRegistry.applicantEmail
      };
    } else {
      previewTemplateData.applicant = {
        Заявител: claimRegistryUtils.nomSelectVarNames!.applicantTypeName
      };
    }

    return previewTemplateData;
  }

  assignInitialClaimRegistryData(
    cardDetailsRequest: CardDetailsRequest,
    user: AxiomUser,
    insuranceCardNumber: string,
    packages: Array<StringIAxiomNom>,
    insuranceTypeCode: string,
    applicantTypeName: string,
    pinTypeItems: INomVO<string>[],
    dateRange: HealthPolicyClaimRegistryDateRange
  ) {
    this.hasApplicant = cardDetailsRequest.applicantTypeId !== ApplicantType.Insured;
    let claimRegistry = new HealthPolicyClaimRegistryForm();

    claimRegistry.applicantTypeId = cardDetailsRequest.applicantTypeId;
    claimRegistry.insuranceCardNumber = insuranceCardNumber;
    claimRegistry.claimDate = cardDetailsRequest.claimDate;
    claimRegistry.paymentTypeId = PaymentType.Bank;
    claimRegistry.pinType = cardDetailsRequest.pinType!;
    claimRegistry.pin = cardDetailsRequest.pin!;

    if (this.hasApplicant) {
      claimRegistry.applicantFirstName = user.firstName;
      claimRegistry.applicantMiddleName = user.middleName ?? '';
      claimRegistry.applicantLastName = user.lastName;
      claimRegistry.applicantPhoneNumber = user.phoneNumber;
      claimRegistry.applicantEmail = user.email;
      claimRegistry.applicantPinType = user.pinType;
      claimRegistry.applicantPin = user.pin;
    } else {
      claimRegistry.firstName = user.firstName;
      claimRegistry.middleName = user.middleName ?? '';
      claimRegistry.lastName = user.lastName;
      claimRegistry.phoneNumber = user.phoneNumber;
      claimRegistry.email = user.email;
    }

    this.nextFormData(claimRegistry);
    this.nextPolicyPackages(packages);
    this.nextNomSelectVarNames({ applicantTypeName } as NomSelectVarNames);
    this.nextInsuranceTypeCode(insuranceTypeCode);
    this.nextPinTypeItems(pinTypeItems);
    this.nextDateRange(dateRange);
  }

  getClaimRequestObject(): CreateClaimRequest {
    return this.createClaimRequestObject(this.healthPolicyClaimsRegistryPreviewDataContainer.getValue());
  }

  private createClaimRequestObject(fv: HealthPolicyClaimRegistryForm): CreateClaimRequest {
    const claimRequestObject: CreateClaimRequest = {
      applicantTypeId: fv.applicantTypeId!,
      insuredPerson: {
        pinType: fv.pinType!,
        pin: fv.pin!,
        firstName: fv.firstName!,
        middleName: fv.middleName,
        lastName: fv.lastName!,
        townId: fv.townId!,
        address: fv.address!,
        phoneNumber: fv.phoneNumber!,
        email: fv.email!,
        zipCode: fv.zipCode!
      },
      claimDate: fv.claimDate!,
      claimReasonId: fv.claimReasonId!,
      insuranceCardNumber: fv.insuranceCardNumber!,
      paymentTypeId: fv.paymentTypeId!,
      bankPayment: {
        iban: fv.iban!,
        accountHolder: fv.accountHolder!,
        accountHolderPinType: fv.accountHolderPinType!,
        accountHolderPIN: fv.accountHolderPin!
      },
      note: fv.note!,
      cases: [
        {
          packageCode: fv.packageCode!,
          beginDate: fv.claimDate!,
          endDate: fv.claimDate!,
          claimAmount: fv.claimAmount!,
          invoiceNumber: fv.invoiceNumber!,
          invoiceDate: fv.invoiceDate!,
          medicalDocuments: this.claimRegistryUtilsContainer
            .getValue()
            .documentTypes?.filter((dt) => this.selectDocumentTypeFiles(dt.externalDocumentTypeId).length > 0)
            .map((type) => {
              return {
                claimDocumentType: type.claimDocumentTypeId,
                documentNumber: this.selectDocDataNumber(type.externalDocumentTypeId),
                documentDate: this.selectDocDataDate(type.externalDocumentTypeId),
                documentDescription: 'Test',
                documentFiles: this.selectDocumentTypeFiles(type.externalDocumentTypeId)
              };
            }) as HealthMedicalDocument[]
        }
      ],
      preferredCommunicationChannel: fv.preferredCommunicationChannel!
    };

    if (this.hasApplicant) {
      claimRequestObject.applicant = {
        pinType: fv.applicantPinType!,
        pin: fv.applicantPin!,
        firstName: fv.applicantFirstName!,
        middleName: fv.applicantMiddleName,
        lastName: fv.applicantLastName!,
        townId: fv.applicantTownId!,
        address: fv.applicantAddress!,
        phoneNumber: fv.applicantPhoneNumber!,
        email: fv.email!,
        zipCode: fv.zipCode!
      };
    }

    return claimRequestObject;
  }

  private selectDocumentTypeFiles(externalDocumentType: number): HealthMedicalDocumentFile[] {
    const files = this.healthPolicyDocumentFilesContainer.getValue();
    switch (externalDocumentType) {
      case HealthClaimDocumentFileType.AmbulatoryFile:
        return files.ambulatoryFiles.map<HealthMedicalDocumentFile>(
          (f) => ({ originalFileName: f.fileName, fileData: f.fileContent } as HealthMedicalDocumentFile)
        );
      case HealthClaimDocumentFileType.InvoiceFile:
        return files.invoiceFiles.map<HealthMedicalDocumentFile>(
          (f) => ({ originalFileName: f.fileName, fileData: f.fileContent } as HealthMedicalDocumentFile)
        );
      case HealthClaimDocumentFileType.ReceiptFile:
        return files.receiptFiles.map<HealthMedicalDocumentFile>(
          (f) => ({ originalFileName: f.fileName, fileData: f.fileContent } as HealthMedicalDocumentFile)
        );
      case HealthClaimDocumentFileType.LabTestFile:
        return files.labTestFiles.map<HealthMedicalDocumentFile>(
          (f) => ({ originalFileName: f.fileName, fileData: f.fileContent } as HealthMedicalDocumentFile)
        );
      case HealthClaimDocumentFileType.CardTherapyFile:
        return files.cardTherapyFiles.map<HealthMedicalDocumentFile>(
          (f) => ({ originalFileName: f.fileName, fileData: f.fileContent } as HealthMedicalDocumentFile)
        );
      default:
        return [];
    }
  }

  private selectDocDataNumber(externalDocumentType: number): string {
    const medicalDocsData = this.claimRegistryUtilsContainer.getValue().medicalDocsData;
    switch (externalDocumentType) {
      case HealthClaimDocumentFileType.AmbulatoryFile:
        return medicalDocsData?.ambulatoryFile.number!;
      case HealthClaimDocumentFileType.InvoiceFile:
        return medicalDocsData?.ambulatoryFile.number!;
      case HealthClaimDocumentFileType.ReceiptFile:
        return medicalDocsData?.ambulatoryFile.number!;
      case HealthClaimDocumentFileType.LabTestFile:
        return medicalDocsData?.ambulatoryFile.number!;
      case HealthClaimDocumentFileType.CardTherapyFile:
        return medicalDocsData?.ambulatoryFile.number!;
      default:
        return 'Грешка!';
    }
  }

  private selectDocDataDate(externalDocumentType: number): Date {
    const medicalDocsData = this.claimRegistryUtilsContainer.getValue().medicalDocsData;
    switch (externalDocumentType) {
      case HealthClaimDocumentFileType.AmbulatoryFile:
        return medicalDocsData?.ambulatoryFile.date!;
      case HealthClaimDocumentFileType.InvoiceFile:
        return medicalDocsData?.invoiceFile.date!;
      case HealthClaimDocumentFileType.ReceiptFile:
        return medicalDocsData?.receiptFile.date!;
      case HealthClaimDocumentFileType.LabTestFile:
        return medicalDocsData?.labTestFile.date!;
      case HealthClaimDocumentFileType.CardTherapyFile:
        return medicalDocsData?.cardTherapyFile.date!;
      default:
        return new Date();
    }
  }

  resetContainersData() {
    this.healthPolicyClaimsRegistryPreviewDataContainer.next(new HealthPolicyClaimRegistryForm());
    this.claimRegistryUtilsContainer.next({} as HealthPolicyClaimRegistryUtils);
    this.healthPolicyDocumentFilesContainer.next({
      invoiceFiles: [],
      receiptFiles: [],
      ambulatoryFiles: [],
      labTestFiles: [],
      cardTherapyFiles: []
    } as HealthPolicyDocumentFiles);
    this.isInitial = true;
  }

  formatFullName(name: string | null, middleName: string | null | undefined, lastName: string | null): string | null {
    const names: string[] = [];
    if (name) {
      names.push(name);
    } else {
      return null;
    }

    if (middleName) {
      names.push(middleName);
    }

    if (lastName) {
      names.push(lastName);
    }

    return names.join(' ');
  }

  redirectOnReload(router: Router, destination: string) {
    if (performance?.navigation && performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this.resetContainersData();
      router.navigate([destination]);
    }
  }
}
