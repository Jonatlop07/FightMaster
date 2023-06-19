import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';
import { Nullable } from '@core/abstraction/type';
import { Event } from '@core/domain/fighting/entity/event';
import { Fighter } from '@core/domain/fighting/entity/fighter';

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
  event: Event;
  fighter1: Fighter;
  fighter2: Fighter;
  winner: Nullable<Fighter>;
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
