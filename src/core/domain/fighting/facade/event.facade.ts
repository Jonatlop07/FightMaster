import {
  DeleteEventInputPort,
  DeleteEventInteractor,
  DeleteEventOutputPort
} from '@core/domain/fighting/use_case/event/delete_event';
import {
  QueryEventsInputPort,
  QueryEventsInteractor,
  QueryEventsOutputPort
} from '@core/domain/fighting/use_case/event/query_events';
import {
  CreateEventInputPort,
  CreateEventInteractor,
  CreateEventOutputPort
} from '@core/domain/fighting/use_case/event/create_event';
import {
  QueryEventInputPort,
  QueryEventInteractor,
  QueryEventOutputPort
} from '@core/domain/fighting/use_case/event/query_event';
import {
  UpdateEventInputPort,
  UpdateEventInteractor,
  UpdateEventOutputPort
} from '@core/domain/fighting/use_case/event/update_event';
import { CoreLogger } from '@core/abstraction/logging';

export interface EventFacade {
  queryEvent(input: QueryEventInputPort): Promise<QueryEventOutputPort>;
  queryEvents(input: QueryEventsInputPort): Promise<QueryEventsOutputPort>;
  createEvent(input: CreateEventInputPort): Promise<CreateEventOutputPort>;
  updateEvent(input: UpdateEventInputPort): Promise<UpdateEventOutputPort>;
  deleteEvent(input: DeleteEventInputPort): Promise<DeleteEventOutputPort>;
}

export interface EventFacadeDeps {
  query_event_interactor: QueryEventInteractor;
  query_events_interactor: QueryEventsInteractor;
  create_event_interactor: CreateEventInteractor;
  update_event_interactor: UpdateEventInteractor;
  delete_event_interactor: DeleteEventInteractor;
  logger: CoreLogger;
}
