import { RankingFacade, RankingFacadeDeps } from '@core/domain/fighting/facade/ranking.facade';
import {
  QueryWeightClassRankingInputPort, QueryWeightClassRankingInteractor,
  QueryWeightClassRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/query_weight_class_ranking';
import { CoreLogger } from '@core/abstraction/logging';
import {
  UpdateRankingInputPort,
  UpdateRankingInteractor,
  UpdateRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/update_ranking';
import {
  CreateFighterRankingInputPort,
  CreateFighterRankingInteractor, CreateFighterRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/create_fighter_ranking.service';

export class RankingFacadeImpl implements RankingFacade {
  private readonly query_weight_class_ranking_interactor: QueryWeightClassRankingInteractor;
  private readonly update_ranking_interactor: UpdateRankingInteractor;
  private readonly create_fighter_ranking_interactor: CreateFighterRankingInteractor;
  private readonly logger: CoreLogger;

  constructor(dependencies: RankingFacadeDeps) {
    this.query_weight_class_ranking_interactor = dependencies.query_weight_class_ranking_interactor;
    this.update_ranking_interactor = dependencies.update_ranking_interactor;
    this.create_fighter_ranking_interactor = dependencies.create_fighter_ranking_interactor;
    this.logger = dependencies.logger;
  }

  public async queryWeightClassRanking(
    input: QueryWeightClassRankingInputPort
  ): Promise<QueryWeightClassRankingOutputPort> {
    return await this.query_weight_class_ranking_interactor.execute(input);
  }

  public async updateRanking(input: UpdateRankingInputPort): Promise<UpdateRankingOutputPort> {
    return await this.update_ranking_interactor.execute(input);
  }

  public async createFighterRanking(
    input: CreateFighterRankingInputPort
  ): Promise<CreateFighterRankingOutputPort> {
    return await this.create_fighter_ranking_interactor.execute(input);
  }
}
