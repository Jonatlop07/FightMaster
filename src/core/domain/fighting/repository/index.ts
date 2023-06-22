import { DeleteFighterGateway } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';
import { UpdateFighterGateway } from '@core/domain/fighting/use_case/fighter/update_fighter';
import { CreateFighterGateway } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { QueryEventsGateway } from '@core/domain/fighting/use_case/event/query_events';
import { CreateEventGateway } from '@core/domain/fighting/use_case/event/create_event';
import { UpdateEventGateway } from '@core/domain/fighting/use_case/event/update_event';
import { DeleteEventGateway } from '@core/domain/fighting/use_case/event/delete_event';
import { QueryFightersGateway } from '@core/domain/fighting/use_case/fighter/query_fighters';
import { CreateFightGateway } from '@core/domain/fighting/use_case/fight/create_fight';
import { QueryFightsGateway } from '@core/domain/fighting/use_case/fight/query_fights';
import { UpdateFightGateway } from '@core/domain/fighting/use_case/fight/update_fight';
import { DeleteFightGateway } from '@core/domain/fighting/use_case/fight/delete_fight';
import { QueryWeightClassRankingGateway } from '@core/domain/fighting/use_case/ranking/query_weight_class_ranking';
import { UpdateRankingGateway } from '@core/domain/fighting/use_case/ranking/update_ranking';
import { QueryFighterStatsGateway } from '@core/domain/fighting/use_case/fight/query_fighter_stats';
import { CreateFighterRankingGateway } from '@core/domain/fighting/use_case/ranking/create_fighter_ranking.service';

export default interface FighterRepository
  extends
  CreateFighterGateway,
  QueryFighterGateway,
  QueryFightersGateway,
  UpdateFighterGateway,
  DeleteFighterGateway {}

export interface EventRepository
  extends
  CreateEventGateway,
  QueryEventsGateway,
  QueryEventsGateway,
  UpdateEventGateway,
  DeleteEventGateway {}

export interface FightRepository
  extends
  CreateFightGateway,
  QueryFightsGateway,
  QueryFightsGateway,
  UpdateFightGateway,
  DeleteFightGateway,
  QueryFighterStatsGateway {}

export interface RankingRepository
  extends
  QueryWeightClassRankingGateway,
  UpdateRankingGateway,
  CreateFighterRankingGateway {}
