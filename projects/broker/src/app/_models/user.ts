import { AxiomError } from 'projects/broker-api/model/models';

export class User {
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  success: boolean = false;
  errors?: Array<AxiomError>;
  token?: string;
  username?: string;
  isLockedOut?: boolean;
  isNotAllowed?: boolean;
  requiresTwoFactor?: boolean;
}
