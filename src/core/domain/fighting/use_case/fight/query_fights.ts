import { FightDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesInteractor,
  QueryEntitiesOutputPort
} from '@core/domain/fighting/use_case/query_entities';
import { FightsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export type QueryFightsInteractor = QueryEntitiesInteractor<FightsFilterParamsDTO, FightDTO>;
export type QueryFightsInputPort = QueryEntitiesInputPort<FightsFilterParamsDTO>;
export type QueryFightsOutputPort = QueryEntitiesOutputPort<FightDTO>;
export type QueryFightsGateway = QueryEntitiesGateway<FightsFilterParamsDTO, FightDTO>;
