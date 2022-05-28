/**
 * Axiom CRM API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HealthMedicalDocument } from './healthMedicalDocument';

export interface HealthClaimCase { 
    packageCode: string;
    beginDate: Date;
    endDate: Date;
    claimAmount: number;
    invoiceNumber?: string;
    invoiceDate: Date;
    medicalDocuments?: Array<HealthMedicalDocument>;
}