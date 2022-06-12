import { PinType } from '../_enumerations/pin-type';
import { Agent } from '../_models/agent';

export class Sample {
  public constructor(sample?: Partial<Sample>) {
    Object.assign(this, sample);
  }

  id: number = -1;
  position: number = -1;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  fullName: string = '';
}

export const AGENTS_DATA: Agent[] = [
  {
    id: 11,
    position: 1,
    pin: '0000000000',
    pinType: PinType.EGN,
    firstName: 'Александър',
    middleName: 'Димитров',
    lastName: 'Димитров',
    fullName: 'Александър Димитров Димитров',
    code: 'code1'
  },
  {
    id: 22,
    position: 2,
    pin: '1234567890',
    pinType: PinType.EGN,
    firstName: 'Петър',
    middleName: 'Василев',
    lastName: 'Петров',
    fullName: 'Петър Василев Петров',
    code: 'code2'
  },
  {
    id: 33,
    position: 3,
    pin: '7710132846',
    pinType: PinType.EGN,
    firstName: 'Сирма',
    middleName: 'Неделчева',
    lastName: 'Войводина',
    fullName: 'Сирма Неделчева Войводина',
    code: 'code3'
  },
  {
    id: 44,
    position: 4,
    pin: '0000000004',
    pinType: PinType.EGN,
    firstName: 'Радко',
    middleName: 'Неделев',
    lastName: 'Радев',
    fullName: 'Радко Неделев Радев',
    code: 'code4'
  },
  {
    id: 55,
    position: 5,
    pin: '0000000005',
    pinType: PinType.EGN,
    firstName: 'Ангел',
    middleName: 'Борисов',
    lastName: 'Ангелов',
    fullName: 'Ангел Борисов Ангелов',
    code: 'code5'
  },
  {
    id: 66,
    position: 6,
    pin: '0000000006',
    pinType: PinType.EGN,
    firstName: 'Илия',
    middleName: 'Михов',
    lastName: 'Пендарев',
    fullName: 'Илия Михов Пендарев',
    code: 'code6'
  },
  {
    id: 77,
    position: 7,
    pin: '0000000007',
    pinType: PinType.EGN,
    firstName: 'Григор',
    middleName: 'Личев',
    lastName: 'Андреев',
    fullName: 'Григор Личев Андреев',
    code: 'code7'
  },
  {
    id: 88,
    position: 8,
    pin: '0000000008',
    pinType: PinType.EGN,
    firstName: 'Валя',
    middleName: 'Петрова',
    lastName: 'Алексова',
    fullName: 'Валя Петрова Алексова',
    code: 'code8'
  },
  {
    id: 99,
    position: 9,
    pin: '0000000009',
    pinType: PinType.EGN,
    firstName: 'Гергана',
    middleName: 'Саздова',
    lastName: 'Иванова',
    fullName: 'Гергана Саздова Иванова',
    code: 'code9'
  },
  {
    id: 101,
    position: 11,
    pin: '0000000011',
    pinType: PinType.EGN,
    firstName: 'Александър2',
    middleName: 'Димитров',
    lastName: 'Димитров',
    fullName: 'Александър2 Димитров Димитров',
    code: 'code1'
  },
  {
    id: 202,
    position: 22,
    pin: '0000000022',
    pinType: PinType.EGN,
    firstName: 'Петър2',
    middleName: 'Василев',
    lastName: 'Петров',
    fullName: 'Петър2 Василев Петров',
    code: 'code2'
  },
  {
    id: 303,
    position: 33,
    pin: '0000000033',
    pinType: PinType.EGN,
    firstName: 'Сирма2',
    middleName: 'Неделчева',
    lastName: 'Войводина',
    fullName: 'Сирма2 Неделчева Войводина',
    code: 'code3'
  },
  {
    id: 404,
    position: 44,
    pin: '0000000044',
    pinType: PinType.EGN,
    firstName: 'Радко2',
    middleName: 'Неделев',
    lastName: 'Радев',
    fullName: 'Радко2 Неделев Радев',
    code: 'code4'
  },
  {
    id: 505,
    position: 55,
    pin: '0000000055',
    pinType: PinType.EGN,
    firstName: 'Ангел2',
    middleName: 'Борисов',
    lastName: 'Ангелов',
    fullName: 'Ангел2 Борисов Ангелов',
    code: 'code5'
  },
  {
    id: 606,
    position: 66,
    pin: '0000000066',
    pinType: PinType.EGN,
    firstName: 'Илия2',
    middleName: 'Михов',
    lastName: 'Пендарев',
    fullName: 'Илия2 Михов Пендарев',
    code: 'code6'
  },
  {
    id: 707,
    position: 77,
    pin: '0000000077',
    pinType: PinType.EGN,
    firstName: 'Григор',
    middleName: 'Личев',
    lastName: 'Андреев',
    fullName: 'Григор2 Личев Андреев',
    code: 'code7'
  },
  {
    id: 808,
    position: 88,
    pin: '0000000088',
    pinType: PinType.EGN,
    firstName: 'Валя2',
    middleName: 'Петрова',
    lastName: 'Алексова',
    fullName: 'Валя2 Петрова Алексова',
    code: 'code8'
  },
  {
    id: 909,
    position: 99,
    pin: '0000000099',
    pinType: PinType.EGN,
    firstName: 'Гергана2',
    middleName: 'Саздова',
    lastName: 'Иванова',
    fullName: 'Гергана2 Саздова Иванова',
    code: 'code9'
  },
  {
    id: 11,
    position: 1,
    pin: '0000000000',
    pinType: PinType.EGN,
    firstName: 'Александър',
    middleName: 'Димитров',
    lastName: 'Димитров',
    fullName: 'Александър Димитров Димитров',
    code: 'code1'
  },
  {
    id: 22,
    position: 2,
    pin: '1234567890',
    pinType: PinType.EGN,
    firstName: 'Петър',
    middleName: 'Василев',
    lastName: 'Петров',
    fullName: 'Петър Василев Петров',
    code: 'code2'
  },
  {
    id: 33,
    position: 3,
    pin: '7710132846',
    pinType: PinType.EGN,
    firstName: 'Сирма',
    middleName: 'Неделчева',
    lastName: 'Войводина',
    fullName: 'Сирма Неделчева Войводина',
    code: 'code3'
  },
  {
    id: 44,
    position: 4,
    pin: '0000000004',
    pinType: PinType.EGN,
    firstName: 'Радко',
    middleName: 'Неделев',
    lastName: 'Радев',
    fullName: 'Радко Неделев Радев',
    code: 'code4'
  },
  {
    id: 55,
    position: 5,
    pin: '0000000005',
    pinType: PinType.EGN,
    firstName: 'Ангел',
    middleName: 'Борисов',
    lastName: 'Ангелов',
    fullName: 'Ангел Борисов Ангелов',
    code: 'code5'
  },
  {
    id: 66,
    position: 6,
    pin: '0000000006',
    pinType: PinType.EGN,
    firstName: 'Илия',
    middleName: 'Михов',
    lastName: 'Пендарев',
    fullName: 'Илия Михов Пендарев',
    code: 'code6'
  },
  {
    id: 77,
    position: 7,
    pin: '0000000007',
    pinType: PinType.EGN,
    firstName: 'Григор',
    middleName: 'Личев',
    lastName: 'Андреев',
    fullName: 'Григор Личев Андреев',
    code: 'code7'
  },
  {
    id: 88,
    position: 8,
    pin: '0000000008',
    pinType: PinType.EGN,
    firstName: 'Валя',
    middleName: 'Петрова',
    lastName: 'Алексова',
    fullName: 'Валя Петрова Алексова',
    code: 'code8'
  },
  {
    id: 99,
    position: 9,
    pin: '0000000009',
    pinType: PinType.EGN,
    firstName: 'Гергана',
    middleName: 'Саздова',
    lastName: 'Иванова',
    fullName: 'Гергана Саздова Иванова',
    code: 'code9'
  },
  {
    id: 101,
    position: 11,
    pin: '0000000011',
    pinType: PinType.EGN,
    firstName: 'Александър2',
    middleName: 'Димитров',
    lastName: 'Димитров',
    fullName: 'Александър2 Димитров Димитров',
    code: 'code1'
  },
  {
    id: 202,
    position: 22,
    pin: '0000000022',
    pinType: PinType.EGN,
    firstName: 'Петър2',
    middleName: 'Василев',
    lastName: 'Петров',
    fullName: 'Петър2 Василев Петров',
    code: 'code2'
  },
  {
    id: 303,
    position: 33,
    pin: '0000000033',
    pinType: PinType.EGN,
    firstName: 'Сирма2',
    middleName: 'Неделчева',
    lastName: 'Войводина',
    fullName: 'Сирма2 Неделчева Войводина',
    code: 'code3'
  },
  {
    id: 404,
    position: 44,
    pin: '0000000044',
    pinType: PinType.EGN,
    firstName: 'Радко2',
    middleName: 'Неделев',
    lastName: 'Радев',
    fullName: 'Радко2 Неделев Радев',
    code: 'code4'
  },
  {
    id: 505,
    position: 55,
    pin: '0000000055',
    pinType: PinType.EGN,
    firstName: 'Ангел2',
    middleName: 'Борисов',
    lastName: 'Ангелов',
    fullName: 'Ангел2 Борисов Ангелов',
    code: 'code5'
  },
  {
    id: 606,
    position: 66,
    pin: '0000000066',
    pinType: PinType.EGN,
    firstName: 'Илия2',
    middleName: 'Михов',
    lastName: 'Пендарев',
    fullName: 'Илия2 Михов Пендарев',
    code: 'code6'
  },
  {
    id: 707,
    position: 77,
    pin: '0000000077',
    pinType: PinType.EGN,
    firstName: 'Григор',
    middleName: 'Личев',
    lastName: 'Андреев',
    fullName: 'Григор2 Личев Андреев',
    code: 'code7'
  },
  {
    id: 808,
    position: 88,
    pin: '0000000088',
    pinType: PinType.EGN,
    firstName: 'Валя2',
    middleName: 'Петрова',
    lastName: 'Алексова',
    fullName: 'Валя2 Петрова Алексова',
    code: 'code8'
  },
  {
    id: 909,
    position: 99,
    pin: '0000000099',
    pinType: PinType.EGN,
    firstName: 'Гергана2',
    middleName: 'Саздова',
    lastName: 'Иванова',
    fullName: 'Гергана2 Саздова Иванова',
    code: 'code9'
  }
];
