import { FightFacade, FightFacadeDeps } from '@core/domain/fighting/facade/fight.facade';
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
import {
  DeleteFightInputPort,
  DeleteFightInteractor,
  DeleteFightOutputPort
} from '@core/domain/fighting/use_case/fight/delete_fight';
import { CoreLogger } from '@core/abstraction/logging';

export class FightFacadeImpl implements FightFacade {
  private readonly query_fight_interactor: QueryFightInteractor;
  private readonly query_fights_interactor: QueryFightsInteractor;
  private readonly create_fight_interactor: CreateFightInteractor;
  private readonly update_fight_interactor: UpdateFightInteractor;
  private readonly delete_fight_interactor: DeleteFightInteractor;
  private readonly logger: CoreLogger;

  constructor(dependencies: FightFacadeDeps) {
    this.query_fight_interactor = dependencies.query_fight_interactor;
    this.query_fights_interactor = dependencies.query_fights_interactor;
    this.create_fight_interactor = dependencies.create_fight_interactor;
    this.update_fight_interactor = dependencies.update_fight_interactor;
    this.delete_fight_interactor = dependencies.delete_fight_interactor;
    this.logger = dependencies.logger;
  }

  public async queryFight(input: QueryFightInputPort): Promise<QueryFightOutputPort> {
    return await this.query_fight_interactor.execute(input);
  }
  public async queryFights(input: QueryFightsInputPort): Promise<QueryFightsOutputPort> {
    return await this.query_fights_interactor.execute(input);
  }
  public async createFight(input: CreateFightInputPort): Promise<CreateFightOutputPort> {
    return await this.create_fight_interactor.execute(input);
  }
  public async updateFight(input: UpdateFightInputPort): Promise<UpdateFightOutputPort> {
    return await this.update_fight_interactor.execute(input);
  }
  public async deleteFight(input: DeleteFightInputPort): Promise<DeleteFightOutputPort> {
    return await this.delete_fight_interactor.execute(input);
  }
}
