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
}
