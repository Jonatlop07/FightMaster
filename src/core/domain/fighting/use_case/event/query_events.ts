import { EventDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesInteractor,
  QueryEntitiesOutputPort
} from '@core/domain/fighting/use_case/query_entities';
import { EventsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export type QueryEventsInteractor = QueryEntitiesInteractor<EventsFilterParamsDTO, EventDTO>;
export type QueryEventsInputPort = QueryEntitiesInputPort<EventsFilterParamsDTO>;
export type QueryEventsOutputPort = QueryEntitiesOutputPort<EventDTO>;
export type QueryEventsGateway = QueryEntitiesGateway<EventsFilterParamsDTO, EventDTO>;
