import { Interactor } from '@core/abstraction/interactor/interactor';
import { FighterRankingWithStatsDTO, RankingDTO } from '@core/domain/fighting/dto/dto';
import { Update } from '@core/abstraction/persistence';

export interface UpdateRankingInputPort {
  fighters_ranking_with_stats: Array<FighterRankingWithStatsDTO>;
}

export interface UpdateRankingOutputPort {
  updated_ranking: Array<RankingDTO>;
}

export interface UpdateRankingGateway extends Update<RankingDTO> {}

export interface UpdateRankingInteractor
  extends Interactor<UpdateRankingInputPort, UpdateRankingOutputPort> {}
