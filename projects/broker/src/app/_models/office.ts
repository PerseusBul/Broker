import { Agent } from 'http';
import { Region } from './region';

export interface Office {
  id: number;
  name: string;
  address: string;
  region: Region;
  manager: string;
  agents: Agent[];
}
