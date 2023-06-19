import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { Delete, FindOne } from '@core/abstraction/persistence';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface DeleteEventInputPort extends InputPort {
  params: EventFilterParamsDTO;
}

interface DeleteEventOutputPort extends OutputPort {
  deleted_event: EventDTO;
}

interface DeleteEventInteractor
  extends Interactor<DeleteEventInputPort, DeleteEventOutputPort> {}

interface DeleteEventGateway extends
  FindOne<EventFilterParamsDTO, EventDTO>,
  Delete<EventFilterParamsDTO, EventDTO> {}

export {
  DeleteEventInputPort,
  DeleteEventOutputPort,
  DeleteEventInteractor,
  DeleteEventGateway,
};
