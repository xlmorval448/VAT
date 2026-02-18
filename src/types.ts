export type ValorantRole = 'Duelist' | 'Controller' | 'Initiator' | 'Sentinel';

export interface Agent {
  id?: string;
  name: string;
  role: ValorantRole;
  description: string;
  releaseYear: number;
}