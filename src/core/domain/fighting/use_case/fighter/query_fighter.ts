import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntityGateway,
  QueryEntityInputPort, QueryEntityInteractor,
  QueryEntityOutputPort
} from '@core/domain/fighting/use_case/query_entity';

export type QueryFighterInteractor = QueryEntityInteractor<FighterFilterParamsDTO, FighterDTO>;
export type QueryFighterInputPort = QueryEntityInputPort<FighterFilterParamsDTO>;
export type QueryFighterOutputPort = QueryEntityOutputPort<FighterDTO>;
export type QueryFighterGateway = QueryEntityGateway<FighterFilterParamsDTO, FighterDTO>;
