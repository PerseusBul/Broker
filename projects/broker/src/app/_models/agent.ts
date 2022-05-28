export class Agent {
  public constructor(init?: Partial<Agent>) {
    Object.assign(this, init);
  }

  id: number = -1;
  pin: string = '';
  pinType: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  fullName: string = '';
  code: string = '';
}

export class AgentDS {
  public constructor(init?: Partial<AgentDS>) {
    Object.assign(this, init);
  }

  id: number = -1;
  fullName: string = '';
}
