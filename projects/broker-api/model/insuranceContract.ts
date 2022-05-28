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
import { InsurancePackage } from './insurancePackage';

export interface InsuranceContract {
  egn?: string;
  insuranceNumber?: string;
  insuranceCardNumber?: string;
  insuranceStatusCode?: string;
  insuranceStatus?: string;
  contractNumber?: string;
  beginDate: Date;
  endDate: Date;
  insuredPersonName?: string;
  insuranceType?: string;
  insuranceTypeCode?: string;
  packages?: Array<InsurancePackage>;
}
