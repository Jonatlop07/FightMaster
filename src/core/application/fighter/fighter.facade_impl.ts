import { FighterFacade, FighterFacadeDeps } from '@core/domain/fighting/facade/fighter.facade';
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
import {
  DeleteFighterInputPort,
  DeleteFighterInteractor,
  DeleteFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { CoreLogger } from '@core/abstraction/logging';
import {
  QueryFighterStatsInputPort, QueryFighterStatsInteractor,
  QueryFighterStatsOutputPort
} from '@core/domain/fighting/use_case/fight/query_fighter_stats';

export class FighterFacadeImpl implements FighterFacade {
  private readonly query_fighter_interactor: QueryFighterInteractor;
  private readonly query_fighters_interactor: QueryFightersInteractor;
  private readonly create_fighter_interactor: CreateFighterInteractor;
  private readonly update_fighter_interactor: UpdateFighterInteractor;
  private readonly delete_fighter_interactor: DeleteFighterInteractor;
  private readonly query_fighter_stats_interactor: QueryFighterStatsInteractor;

  private readonly logger: CoreLogger;

  constructor(dependencies: FighterFacadeDeps) {
    this.query_fighter_interactor = dependencies.query_fighter_interactor;
    this.query_fighters_interactor = dependencies.query_fighters_interactor;
    this.create_fighter_interactor = dependencies.create_fighter_interactor;
    this.update_fighter_interactor = dependencies.update_fighter_interactor;
    this.delete_fighter_interactor = dependencies.delete_fighter_interactor;
    this.query_fighter_stats_interactor = dependencies.query_fighter_stats_interactor;
    this.logger = dependencies.logger;
  }

  public async queryFighter(input: QueryFighterInputPort): Promise<QueryFighterOutputPort> {
    return await this.query_fighter_interactor.execute(input);
  }
  public async queryFighters(input: QueryFightersInputPort): Promise<QueryFightersOutputPort> {
    return await this.query_fighters_interactor.execute(input);
  }
  public async createFighter(input: CreateFighterInputPort): Promise<CreateFighterOutputPort> {
    return await this.create_fighter_interactor.execute(input);
  }
  public async updateFighter(input: UpdateFighterInputPort): Promise<UpdateFighterOutputPort> {
    return await this.update_fighter_interactor.execute(input);
  }
  public async deleteFighter(input: DeleteFighterInputPort): Promise<DeleteFighterOutputPort> {
    return await this.delete_fighter_interactor.execute(input);
  }
  public async queryFighterStats(
    input: QueryFighterStatsInputPort
  ): Promise<QueryFighterStatsOutputPort> {
    return await this.query_fighter_stats_interactor.execute(input);
  }
}

export interface FighterExternalFacade {
  queryFighter(input: QueryFighterInputPort): Promise<QueryFighterOutputPort>;
  queryFighterStats(input: QueryFighterStatsInputPort): Promise<QueryFighterStatsOutputPort>;
}
