import QueryEntityService from '@core/application/fighting/create_entity.service';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesOutputPort
} from '@core/domain/fighting/use_case/query_entities';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export type QueryEventsInteractor = QueryEntityService<EventFilterParamsDTO, EventDTO>;
export type QueryEventsInputPort = QueryEntitiesInputPort<EventFilterParamsDTO>;
export type QueryEventsOutputPort = QueryEntitiesOutputPort<EventDTO>;
export type QueryEventsGateway = QueryEntitiesGateway<EventFilterParamsDTO, EventDTO>;
