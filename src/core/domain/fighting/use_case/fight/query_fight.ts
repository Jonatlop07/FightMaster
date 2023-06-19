import { FightFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntityGateway,
  QueryEntityInputPort, QueryEntityInteractor,
  QueryEntityOutputPort
} from '@core/domain/fighting/use_case/query_entity';

export type QueryFightInteractor = QueryEntityInteractor<FightFilterParamsDTO, FightDTO>;
export type QueryFightInputPort = QueryEntityInputPort<FightFilterParamsDTO>;
export type QueryFightOutputPort = QueryEntityOutputPort<FightDTO>;
export type QueryFightGateway = QueryEntityGateway<FightFilterParamsDTO, FightDTO>;
