import { INomVO } from 'projects/shared/components/nom-select/nom-service';

export const CommunicationChannels = [
  { id: 1, name: 'Имейл' },
  { id: 2, name: 'Телефон' }
] as INomVO<number>[];

export enum CommunicationChannel {
  Email = 1,
  Phone = 2
}