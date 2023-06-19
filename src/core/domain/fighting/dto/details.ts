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
  event_id: number;
  fighter1_id: number;
  fighter2_id: number;
  winner_id: number;
}

export interface UpdateFightDetailsDTO {
  id: number;
  winner_id: number;

}
