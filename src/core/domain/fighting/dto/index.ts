export interface FighterDTO {
  id: number;
  name: string;
  weight_class: string;
  nationality: string;
  team: string;
  stats: FighterStatsDTO;
}

export interface FighterStatsDTO {
  id: number;
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
