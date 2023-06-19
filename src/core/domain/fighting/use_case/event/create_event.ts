import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityInteractor,
  CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { EventDetailsDTO } from '@core/domain/fighting/dto/details';

export type CreateEventInteractor = CreateEntityInteractor<EventDetailsDTO, EventDTO>;
export type CreateEventInputPort = CreateEntityInputPort<EventDetailsDTO>;
export type CreateEventOutputPort = CreateEntityOutputPort<EventDTO>;
export type CreateEventGateway = CreateEntityGateway<EventDetailsDTO, EventDTO>;
