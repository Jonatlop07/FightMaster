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
}

export interface EventDTO {
  id: number;
  name: string;
  location: string;
  date: Date;
}

export interface FightDTO {
  id: number;
  event_id: number;
  fighter1_id: number;
  fighter2_id: number;
  winner_id: Nullable<number>;
}
