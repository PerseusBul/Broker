export class Region {
  public constructor(init?: Partial<Region>) {
    Object.assign(this, init);
  }

  id: number = -1;
  agentId: number = -1;
  name: string = '';
  code: string = '';
}
