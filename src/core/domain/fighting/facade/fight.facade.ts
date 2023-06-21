import {
  DeleteFightInputPort,
  DeleteFightInteractor,
  DeleteFightOutputPort
} from '@core/domain/fighting/use_case/fight/delete_fight';
import {
  QueryFightsInputPort,
  QueryFightsInteractor,
  QueryFightsOutputPort
} from '@core/domain/fighting/use_case/fight/query_fights';
import {
  CreateFightInputPort,
  CreateFightInteractor,
  CreateFightOutputPort
} from '@core/domain/fighting/use_case/fight/create_fight';
import {
  QueryFightInputPort,
  QueryFightInteractor,
  QueryFightOutputPort
} from '@core/domain/fighting/use_case/fight/query_fight';
import {
  UpdateFightInputPort,
  UpdateFightInteractor,
  UpdateFightOutputPort
} from '@core/domain/fighting/use_case/fight/update_fight';
import { CoreLogger } from '@core/abstraction/logging';

export interface FightFacade {
  queryFight(input: QueryFightInputPort): Promise<QueryFightOutputPort>;
  queryFights(input: QueryFightsInputPort): Promise<QueryFightsOutputPort>;
  createFight(input: CreateFightInputPort): Promise<CreateFightOutputPort>;
  updateFight(input: UpdateFightInputPort): Promise<UpdateFightOutputPort>;
  deleteFight(input: DeleteFightInputPort): Promise<DeleteFightOutputPort>;
}

export interface FightFacadeDeps {
  query_fight_interactor: QueryFightInteractor;
  query_fights_interactor: QueryFightsInteractor;
  create_fight_interactor: CreateFightInteractor;
  update_fight_interactor: UpdateFightInteractor;
  delete_fight_interactor: DeleteFightInteractor;
  logger: CoreLogger;
}
