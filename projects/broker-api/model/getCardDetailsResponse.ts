import { AxiomError } from './axiomError';
import { AxiomUser } from './axiomUser';
import { StringIAxiomNom } from './stringIAxiomNom';

export interface GetCardDetailsResponse {
  success: boolean;
  errors?: Array<AxiomError>;
  insuranceTypeCode?: string;
  insuranceCardNumber?: string;
  beginDate?: Date;
  endDate?: Date;
  packages?: Array<StringIAxiomNom>;
  user?: AxiomUser;
}
