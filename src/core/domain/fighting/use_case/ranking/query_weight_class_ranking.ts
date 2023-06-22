import { RankingFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { RankingDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesInteractor,
  QueryEntitiesOutputPort,
} from '@core/domain/fighting/use_case/query_entities';

export type QueryWeightClassRankingInteractor = QueryEntitiesInteractor<RankingFilterParamsDTO, RankingDTO>;
export type QueryWeightClassRankingInputPort = QueryEntitiesInputPort<RankingFilterParamsDTO>;
export type QueryWeightClassRankingOutputPort = QueryEntitiesOutputPort<RankingDTO>;
export type QueryWeightClassRankingGateway = QueryEntitiesGateway<RankingFilterParamsDTO, RankingDTO>;
