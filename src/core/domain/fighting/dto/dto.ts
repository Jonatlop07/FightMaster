import { Nullable } from '@core/abstraction/type';
import { FightWinMethod, WeightClass } from '@core/domain/fighting/entity/enum';

interface FighterDTO {
  id: number;
  name: string;
  weight_class: WeightClass;
  nationality: string;
  team: string;
}

interface FighterStatsDTO {
  fighter_id: number;
  wins: number;
  losses: number;
  knockouts: number;
  submissions: number;
  tech_knockouts: number;
  by_decision: number;
}

interface EventDTO {
  id: number;
  name: string;
  location: string;
  date: Date;
}

interface FightDTO {
  id: number;
  event: EventDTO;
  fighter1: FighterDTO;
  fighter2: FighterDTO;
  winner: Nullable<FighterDTO>;
  win_method: Nullable<FightWinMethod>;
}

interface RankingDTO {
  id: number;
  weight_class: WeightClass;
  rank: number;
  fighter: FighterDTO;
}

interface FighterRankingWithStatsDTO {
  ranking: RankingDTO,
  stats: FighterStatsDTO
}

interface RankingWithScoreDTO {
  ranking: RankingDTO;
  score: number;
}

export {
  FighterDTO,
  FighterStatsDTO,
  EventDTO,
  FightDTO,
  RankingDTO,
  FighterRankingWithStatsDTO,
  RankingWithScoreDTO
};
