import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';

export type CreateFighterEntityPayload = {
  id: number;
  stats: FighterStats,
  name: string,
  weightClass: string,
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
  eventId: number;
  fighter1Id: number;
  fighter2Id: number;
  winnerId: number;
};

export type CreateEventEntityPayload = {
  id: number;
  name: string;
  location: string;
  date: Date;
};

export type CreateRankingEntityPayload = {
  id: number;
  weightClass: string;
  rank: number;
  fighterId: number;
};
