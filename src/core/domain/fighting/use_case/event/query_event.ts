import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntityGateway,
  QueryEntityInputPort, QueryEntityInteractor,
  QueryEntityOutputPort
} from '@core/domain/fighting/use_case/query_entity';

export type QueryEventInteractor = QueryEntityInteractor<EventFilterParamsDTO, EventDTO>;
export type QueryEventInputPort = QueryEntityInputPort<EventFilterParamsDTO>;
export type QueryEventOutputPort = QueryEntityOutputPort<EventDTO>;
export type QueryEventGateway = QueryEntityGateway<EventFilterParamsDTO, EventDTO>;
