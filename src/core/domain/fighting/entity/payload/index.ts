import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';

export type CreateFighterEntityPayload = {
  id: number;
  stats: FighterStats,
  name: string,
  weight_class: string,
  nationality: string,
  team: string,
};

export type CreateFighterStatsPayload = {
  id: number;
  wins: number,
  losses: number,
  knockouts: number,
  submissions: number,
};

export type CreateFightEntityPayload = {
  id: number;
  event_id: number;
  fighter1_id: number;
  fighter2_id: number;
  winner_id: number;
};

export type CreateEventEntityPayload = {
  id: number;
  name: string;
  location: string;
  date: Date;
};

export type CreateRankingEntityPayload = {
  id: number;
  weight_class: string;
  rank: number;
  fighter_id: number;
};
