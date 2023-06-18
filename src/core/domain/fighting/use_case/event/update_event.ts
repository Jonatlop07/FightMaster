import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { EventDTO } from '@core/domain/fighting/dto';
import { Exists, Update } from '@core/abstraction/persistence';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface UpdateEventInputPort extends InputPort {
  event_with_updates: EventDTO;
}

interface UpdateEventOutputPort extends OutputPort {
  updated_event: EventDTO;
}

interface UpdateEventInteractor
  extends Interactor<UpdateEventInputPort, UpdateEventOutputPort> {}

interface UpdateEventGateway extends Exists<EventFilterParamsDTO>, Update<EventDTO> {}

export {
  UpdateEventInputPort,
  UpdateEventOutputPort,
  UpdateEventInteractor,
  UpdateEventGateway,
};
