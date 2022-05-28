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
import { AxiomError } from './axiomError';
import { AxiomUser } from './axiomUser';

export interface GetUserResponse { 
    success: boolean;
    errors?: Array<AxiomError>;
    user?: AxiomUser;
}