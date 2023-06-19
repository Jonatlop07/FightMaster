import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { FindOne } from '@core/abstraction/persistence';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface QueryEventInputPort extends InputPort {
  params: EventFilterParamsDTO;
}

interface QueryEventOutputPort extends OutputPort {
  event: EventDTO;
}

interface QueryEventInteractor
  extends Interactor<QueryEventInputPort, QueryEventOutputPort> {}

interface QueryEventGateway extends
  FindOne<EventFilterParamsDTO, EventDTO> {}

export {
  QueryEventInputPort,
  QueryEventOutputPort,
  QueryEventInteractor,
  QueryEventGateway,
};
