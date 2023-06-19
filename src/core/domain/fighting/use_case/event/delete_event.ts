import {
  DeleteEntityGateway,
  DeleteEntityInputPort,
  DeleteEntityInteractor,
  DeleteEntityOutputPort
} from '@core/domain/fighting/use_case/delete_entity';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { EventDTO } from '@core/domain/fighting/dto/dto';

export type DeleteEventInteractor = DeleteEntityInteractor<EventFilterParamsDTO, EventDTO>;
export type DeleteEventInputPort = DeleteEntityInputPort<EventFilterParamsDTO>;
export type DeleteEventOutputPort = DeleteEntityOutputPort<EventDTO>;
export type DeleteEventGateway = DeleteEntityGateway<EventFilterParamsDTO, EventDTO>;
