import { EventsController } from '@framework/api/http_rest/controller/event.controller';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDBEntity from '@db/typeorm/entity/event';
import { EventTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/event.repository_adapter';
import QueryEntitiesService from '@core/application/query_entities.service';
import {
  EventFilterParamsDTO,
  EventsFilterParamsDTO,
} from '@core/domain/fighting/dto/filter_params';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/enum';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import { CreateEventGateway, CreateEventInteractor } from '@core/domain/fighting/use_case/event/create_event';
import CreateEntityService from '@core/application/create_entity.service';
import { EventDetailsDTO } from '@core/domain/fighting/dto/details';
import { TransactionalUseCaseWrapper } from '@db/typeorm/transaction';
import { QueryEventGateway, QueryEventInteractor } from '@core/domain/fighting/use_case/event/query_event';
import QueryEntityService from '@core/application/query_entity.service';
import { QueryEventsGateway, QueryEventsInteractor } from '@core/domain/fighting/use_case/event/query_events';
import { UpdateEventGateway, UpdateEventInteractor } from '@core/domain/fighting/use_case/event/update_event';
import UpdateEntityService from '@core/application/update_entity.service';
import { DeleteEventGateway, DeleteEventInteractor } from '@core/domain/fighting/use_case/event/delete_event';
import DeleteEntityService from '@core/application/delete_entity.service';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FighterModule } from '@framework/module/fighter.module';
import { EventFacadeImpl } from '@core/application/event/event.facade_impl';
import { RankingModule } from '@framework/module/ranking.module';
import { FightModule } from '@framework/module/fight.module';
import EventDITokens from '@core/domain/fighting/di/event.di_tokens';

const persistence_providers: Array<Provider> = [
  {
    provide: EventDITokens.EventRepository,
    useClass: EventTypeOrmRepositoryAdapter
  },
];

const feature_providers: Array<Provider> = [
  {
    provide: EventDITokens.CreateEventInteractor,
    useFactory: (gateway: CreateEventGateway, logger: CoreLogger) => {
      const interactor: CreateEventInteractor = new CreateEntityService<
        EventDetailsDTO,
        EventDTO
        >(
        gateway,
        EntityName.Event,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [EventDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: EventDITokens.QueryEventInteractor,
    useFactory: (
      gateway: QueryEventGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<EventFilterParamsDTO, EventDTO>(
        gateway,
        EntityName.Event,
        logger
      ),
    inject: [EventDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: EventDITokens.QueryEventsInteractor,
    useFactory: (
      gateway: QueryEventsGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<EventsFilterParamsDTO, EventDTO>(
        gateway,
        EntityName.Event,
        logger
      ),
    inject: [EventDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: EventDITokens.UpdateEventInteractor,
    useFactory: (gateway: UpdateEventGateway, logger: CoreLogger) => {
      const interactor: UpdateEventInteractor = new UpdateEntityService<EventDTO>(
        gateway,
        EntityName.Event,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [EventDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: EventDITokens.DeleteEventInteractor,
    useFactory: (
      gateway: DeleteEventGateway,
      logger: CoreLogger
    ) => {
      const interactor: DeleteEventInteractor = new DeleteEntityService<
        EventFilterParamsDTO,
        EventDTO
        >(
        gateway,
        EntityName.Event,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [EventDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
];


const facade_providers: Array<Provider> = [
  {
    provide: EventDITokens.EventFacade,
    useFactory: (
      q: QueryEventInteractor,
      qs: QueryEventsInteractor,
      c: CreateEventInteractor,
      u: UpdateEventInteractor,
      d: DeleteEventInteractor,
      l: CoreLogger
    ) =>
      new EventFacadeImpl(
        {
          delete_event_interactor: d,
          update_event_interactor: u,
          create_event_interactor: c,
          query_events_interactor: qs,
          query_event_interactor: q,
          logger: l
        }
      ),
    inject: [
      EventDITokens.QueryEventInteractor,
      EventDITokens.QueryEventsInteractor,
      EventDITokens.CreateEventInteractor,
      EventDITokens.UpdateEventInteractor,
      EventDITokens.DeleteEventInteractor,
      CoreDITokens.CoreLogger
    ]
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([EventDBEntity, FightDBEntity]),
    FightModule,
    FighterModule,
    RankingModule,
  ],
  providers: [
    ...persistence_providers,
    ...feature_providers,
    ...facade_providers,
  ],
  controllers: [EventsController]
})
export class EventsModule {}
