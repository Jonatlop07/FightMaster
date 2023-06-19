import { FighterDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesInteractor,
  QueryEntitiesOutputPort
} from '@core/domain/fighting/use_case/query_entities';
import { FightersFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export type QueryFightersInteractor = QueryEntitiesInteractor<FightersFilterParamsDTO, FighterDTO>;
export type QueryFightersInputPort = QueryEntitiesInputPort<FightersFilterParamsDTO>;
export type QueryFightersOutputPort = QueryEntitiesOutputPort<FighterDTO>;
export type QueryFightersGateway = QueryEntitiesGateway<FightersFilterParamsDTO, FighterDTO>;
