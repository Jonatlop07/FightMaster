import {
  DeleteFighterInputPort,
  DeleteFighterInteractor,
  DeleteFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/delete_fighter';
import {
  QueryFightersInputPort,
  QueryFightersInteractor,
  QueryFightersOutputPort
} from '@core/domain/fighting/use_case/fighter/query_fighters';
import {
  CreateFighterInputPort,
  CreateFighterInteractor,
  CreateFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/create_fighter';
import {
  QueryFighterInputPort,
  QueryFighterInteractor,
  QueryFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/query_fighter';
import {
  UpdateFighterInputPort,
  UpdateFighterInteractor,
  UpdateFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/update_fighter';
import { CoreLogger } from '@core/abstraction/logging';
import {
  QueryFighterStatsInputPort,
  QueryFighterStatsInteractor, QueryFighterStatsOutputPort
} from '@core/domain/fighting/use_case/fight/query_fighter_stats';

export interface FighterFacade {
  queryFighter(input: QueryFighterInputPort): Promise<QueryFighterOutputPort>;
  queryFighters(input: QueryFightersInputPort): Promise<QueryFightersOutputPort>;
  createFighter(input: CreateFighterInputPort): Promise<CreateFighterOutputPort>;
  updateFighter(input: UpdateFighterInputPort): Promise<UpdateFighterOutputPort>;
  deleteFighter(input: DeleteFighterInputPort): Promise<DeleteFighterOutputPort>;
  queryFighterStats(input: QueryFighterStatsInputPort): Promise<QueryFighterStatsOutputPort>;
}

export interface FighterFacadeDeps {
  query_fighter_interactor: QueryFighterInteractor;
  query_fighters_interactor: QueryFightersInteractor;
  create_fighter_interactor: CreateFighterInteractor;
  update_fighter_interactor: UpdateFighterInteractor;
  delete_fighter_interactor: DeleteFighterInteractor;
  query_fighter_stats_interactor: QueryFighterStatsInteractor;
  logger: CoreLogger;
}
