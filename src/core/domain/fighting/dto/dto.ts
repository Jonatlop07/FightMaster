import { Nullable } from '@core/abstraction/type';

export interface FighterDTO {
  id: number;
  name: string;
  weight_class: string;
  nationality: string;
  team: string;
  stats: FighterStatsDTO;
}

export interface FighterStatsDTO {
  fighter_id: number;
  wins: number;
  losses: number;
  knockouts: number;
  submissions: number;
  tech_knockouts: number;
  by_decision: number;
}

export interface EventDTO {
  id: number;
  name: string;
  location: string;
  date: Date;
}

export interface FightDTO {
  id: number;
  event: EventDTO;
  fighter1: FighterDTO;
  fighter2: FighterDTO;
  winner: Nullable<FighterDTO>;
}
