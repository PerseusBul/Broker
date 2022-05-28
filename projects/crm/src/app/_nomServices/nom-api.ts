export * from './applicant-types.service';
export * from './districts.service';
export * from './municipalities.service';
export * from './payment-types.service';
export * from './pin-types.service';
export * from './towns.service';
import { ApplicantTypesService } from './applicant-types.service';
import { DistrictsService } from './districts.service';
import { MunicipalitiesService } from './municipalities.service';
import { PaymentTypesService } from './payment-types.service';
import { PinTypesService } from './pin-types.service';
import { TownsService } from './towns.service';

export const nomAPI = [
  ApplicantTypesService,
  PinTypesService,
  TownsService,
  MunicipalitiesService,
  DistrictsService,
  PaymentTypesService
];
