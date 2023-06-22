import { CoreLogger } from '@core/abstraction/logging';
import {
  QueryWeightClassRankingInputPort,
  QueryWeightClassRankingInteractor,
  QueryWeightClassRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/query_weight_class_ranking';
import {
  UpdateRankingInputPort,
  UpdateRankingInteractor,
  UpdateRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/update_ranking';
import {
  CreateFighterRankingInputPort,
  CreateFighterRankingInteractor, CreateFighterRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/create_fighter_ranking.service';

export interface RankingFacade {
  queryWeightClassRanking(
    input: QueryWeightClassRankingInputPort
  ): Promise<QueryWeightClassRankingOutputPort>;

  updateRanking(input: UpdateRankingInputPort): Promise<UpdateRankingOutputPort>;

  createFighterRanking(input: CreateFighterRankingInputPort): Promise<CreateFighterRankingOutputPort>;
}

export interface RankingFacadeDeps {
  query_weight_class_ranking_interactor: QueryWeightClassRankingInteractor;
  update_ranking_interactor: UpdateRankingInteractor;
  create_fighter_ranking_interactor: CreateFighterRankingInteractor;
  logger: CoreLogger;
}
