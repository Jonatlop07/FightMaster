import {
  UpdateEntityGateway,
  UpdateEntityInputPort,
  UpdateEntityInteractor,
  UpdateEntityOutputPort
} from '@core/domain/fighting/use_case/update_entity';
import { EventDTO } from '@core/domain/fighting/dto/dto';

export type UpdateEventInteractor = UpdateEntityInteractor<EventDTO>;
export type UpdateEventInputPort = UpdateEntityInputPort<EventDTO>;
export type UpdateEventOutputPort = UpdateEntityOutputPort<EventDTO>;
export type UpdateEventGateway = UpdateEntityGateway<EventDTO>;

