import { ClaimDocumentType } from 'projects/crm-api/model/claimDocumentType';
import { Document } from 'projects/crm-api/model/document';
import { GetCardDetailsRequest } from 'projects/crm-api/model/getCardDetailsRequest';
import { IAxiomNom } from 'projects/crm-api/model/IAxiomNom';
import { StringIAxiomNom } from 'projects/crm-api/model/stringIAxiomNom';
import { INomVO } from 'projects/shared/components/nom-select/nom-service';
import { Base64File } from '../_models/base64File';

export type HealthPolicyClaimsRegistry = {
  applicant?: Object;
  insuredPerson: Object;
  claim: Object;
  bankPayment: Object;
  invoice: Object;
  documentFiles: Object;
};

export interface CardDetailsRequest extends GetCardDetailsRequest {
  applicantTypeId: number;
}

export class HealthPolicyClaimRegistryForm {
  applicantTypeId: number | null = null;
  applicantFirstName: string | null = null;
  applicantMiddleName?: string;
  applicantPinType: string | null = null;
  applicantPin: string | null = null;
  applicantLastName: string | null = null;
  applicantDistrict: number | null = null;
  applicantMunicipality: number | null = null;
  applicantTownId: number | null = null;
  applicantAddress: string | null = null;
  applicantZipCode: string | null = null;
  applicantPhoneNumber: string | null = null;
  applicantEmail: string | null = null;
  firstName: string | null = null;
  middleName?: string;
  lastName: string | null = null;
  pinType: string | null = null;
  pin: string | null = null;
  district: number | null = null;
  municipality: number | null = null;
  townId: number | null = null;
  address: string | null = null;
  zipCode: string | null = null;
  phoneNumber: string | null = null;
  email: string | null = null;
  insuranceCardNumber: string | null = null;
  packageCode: string | null = null;
  claimReasonId: number | null = null;
  claimDate: Date | null = null;
  claimAmount: number | null = null;
  note: string | null = null;
  paymentTypeId: number | null = null;
  iban: string | null = null;
  accountHolder: string | null = null;
  userTypeId: string | null = null;
  accountHolderPinType: string | null = null;
  accountHolderPin: string | null = null;
  invoiceNumber: string | null = null;
  invoiceDate: Date | null = null;
  preferredCommunicationChannel: number | null = null;
}

export type HealthPolicyClaimRegistryUtils = {
  accidentTypes?: IAxiomNom[];
  policyPackages?: StringIAxiomNom[];
  locationFilters?: LocationFilters;
  nomSelectVarNames?: NomSelectVarNames;
  insuranceTypeCode?: string;
  documentTypes?: ClaimDocumentType[];
  medicalDocsData?: MedicalDocsData;
  pinTypeItems?: INomVO<string>[];
  dateRange?: HealthPolicyClaimRegistryDateRange;
};

export type LocationFilters = {
  districtsFilter?: number;
  municipalitiesFilter?: number;
  applicantDistrictsFilter?: number;
  applicantMunicipalitiesFilter?: number;
};

export type NomSelectVarNames = {
  applicantTypeName?: string;
  applicantDistrictName?: string;
  applicantMunicipalityName?: string;
  applicantTownName?: string;
  districtName?: string;
  municipalityName?: string;
  townName?: string;
};

export type HealthPolicyDocumentFiles = {
  invoiceFiles: Base64File[];
  receiptFiles: Base64File[];
  ambulatoryFiles: Base64File[];
  labTestFiles: Base64File[];
  cardTherapyFiles: Base64File[];
};

export type DocData = {
  number: string | null;
  date: Date | null;
  description: string | null;
};

export type MedicalDocsData = {
  invoiceFile: DocData;
  receiptFile: DocData;
  ambulatoryFile: DocData;
  labTestFile: DocData;
  cardTherapyFile: DocData;
};

export type HealthPolicyClaimRegistryDialogDataUtils = {
  claimNumber: string;
  canUpload: boolean;
};

export type HealthPolicyClaimRegistryDateRange = {
  minDate: Date;
  maxDate: Date;
};

export type HealthPolicyClaimRegistryDialogData = {
  docsFiles: HealthPolicyDocumentFiles;
  medicalDocsData: MedicalDocsData;
  documents: Document[];
  utils: HealthPolicyClaimRegistryDialogDataUtils;
};

export const RequiredFileTypes: string = 'image/png, image/jpg, image/jpeg, application/pdf';

export const MaxAllFilesSizeMB: number = 30;
