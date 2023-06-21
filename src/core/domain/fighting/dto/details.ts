import { EventDTO, FighterDTO } from '@core/domain/fighting/dto/dto';

export interface FighterDetailsDTO {
  name: string;
  weight_class: string;
  nationality: string;
  team: string;
  stats: FighterStatsDetailsDTO;
}

export interface FighterStatsDetailsDTO {
  wins: number;
  losses: number;
  knockouts: number;
  submissions: number;
  tech_knockouts: number;
  by_decision: number;
}

export interface EventDetailsDTO {
  name: string;
  location: string;
  date: Date;
}

export interface FightDetailsDTO {
  event: EventDTO;
  fighter1: FighterDTO;
  fighter2: FighterDTO;
  winner: FighterDTO;
}

export interface UpdateFightDetailsDTO {
  id: number;
  winner: FighterDTO;
}
