/**
 * Axiom BROKER API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HealthClaimDetail } from './healthClaimDetail';

export interface HealthClaimResponse {
  claimId: number;
  claimDate: Date;
  pin?: string;
  insuranceNumber?: string;
  insuranceCardNumber?: string;
  insuredPersonName?: string;
  claimStatus?: string;
  isLight?: boolean;
  canUpload?: boolean;
  approvedDate: Date;
  invoiceNumber?: string;
  servicesAmount: number;
  approvedServicesAmount: number;
  drugsAmount: number;
  approvedDrugsAmount: number;
  paymentDate: Date;
  currencyCode?: string;
  note?: string;
  approvedNote?: string;
  claimNumTr?: string;
  details?: Array<HealthClaimDetail>;
}
