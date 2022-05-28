import { Guid } from './guid';

export class Message {
  id!: string;
  description: string = '';
  success!: boolean;
  duration?: number;

  public constructor(description: string, success: boolean, duration?: number) {
    this.id = Guid.newGuid();
    this.success = success;
    this.description = description;
    this.duration = duration;
  }
}
