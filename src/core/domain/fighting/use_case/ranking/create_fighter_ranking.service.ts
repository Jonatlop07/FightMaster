import { Interactor } from '@core/abstraction/interactor/interactor';
import { Create, FindAll } from '@core/abstraction/persistence';
import { RankingFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { RankingDetailsDTO } from '@core/domain/fighting/dto/details';
import { RankingDTO } from '@core/domain/fighting/dto/dto';

export interface CreateFighterRankingInputPort {
  ranking_details: RankingDetailsDTO;
}

export interface CreateFighterRankingOutputPort {
  created_ranking: RankingDTO;
}

export interface CreateFighterRankingGateway
  extends
    FindAll<RankingFilterParamsDTO, RankingDTO>,
    Create<RankingDetailsDTO, RankingDTO> {}

export interface CreateFighterRankingInteractor
  extends Interactor<CreateFighterRankingInputPort, CreateFighterRankingOutputPort> {}
