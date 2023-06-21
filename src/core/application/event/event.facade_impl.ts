import { EventFacade, EventFacadeDeps } from '@core/domain/fighting/facade/event.facade';
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
import {
  DeleteEventInputPort,
  DeleteEventInteractor,
  DeleteEventOutputPort
} from '@core/domain/fighting/use_case/event/delete_event';
import { CoreLogger } from '@core/abstraction/logging';

export class EventFacadeImpl implements EventFacade {
  private readonly query_event_interactor: QueryEventInteractor;
  private readonly query_events_interactor: QueryEventsInteractor;
  private readonly create_event_interactor: CreateEventInteractor;
  private readonly update_event_interactor: UpdateEventInteractor;
  private readonly delete_event_interactor: DeleteEventInteractor;
  private readonly logger: CoreLogger;

  constructor(dependencies: EventFacadeDeps) {
    this.query_event_interactor = dependencies.query_event_interactor;
    this.query_events_interactor = dependencies.query_events_interactor;
    this.create_event_interactor = dependencies.create_event_interactor;
    this.update_event_interactor = dependencies.update_event_interactor;
    this.delete_event_interactor = dependencies.delete_event_interactor;
    this.logger = dependencies.logger;
  }

  public async queryEvent(input: QueryEventInputPort): Promise<QueryEventOutputPort> {
    return await this.query_event_interactor.execute(input);
  }
  public async queryEvents(input: QueryEventsInputPort): Promise<QueryEventsOutputPort> {
    return await this.query_events_interactor.execute(input);
  }
  public async createEvent(input: CreateEventInputPort): Promise<CreateEventOutputPort> {
    return await this.create_event_interactor.execute(input);
  }
  public async updateEvent(input: UpdateEventInputPort): Promise<UpdateEventOutputPort> {
    return await this.update_event_interactor.execute(input);
  }
  public async deleteEvent(input: DeleteEventInputPort): Promise<DeleteEventOutputPort> {
    return await this.delete_event_interactor.execute(input);
  }

}
