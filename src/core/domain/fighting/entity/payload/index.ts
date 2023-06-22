import { Nullable, Optional } from '@core/abstraction/type';
import { Event } from '@core/domain/fighting/entity/event';
import { Fighter } from '@core/domain/fighting/entity/fighter';
import { FightWinMethod, WeightClass } from '@core/domain/fighting/entity/enum';

export type CreateFighterEntityPayload = {
  id: number;
  name: string,
  weight_class: WeightClass,
  nationality: string,
  team: string,
};

export type CreateFighterStatsPayload = {
  id: number;
  wins: number,
  losses: number,
  knockouts: number,
  tech_knockouts: number,
  submissions: number,
  by_decision: number,
};

export type CreateFightEntityPayload = {
  id: number;
  event: Event;
  fighter1: Fighter;
  fighter2: Fighter;
  winner: Optional<Nullable<Fighter>>;
  win_method: Optional<Nullable<FightWinMethod>>;
};

export type CreateEventEntityPayload = {
  id: number;
  name: string;
  location: string;
  date: Date;
};

export type CreateRankingEntityPayload = {
  id: number;
  weight_class: WeightClass;
  rank: number;
  fighter_id: number;
};
