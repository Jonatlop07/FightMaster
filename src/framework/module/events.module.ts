import { EventsController } from '@framework/api/http_rest/controller/event.controller';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDBEntity from '@db/typeorm/entity/event';
import FightingDITokens from '@core/domain/fighting/di';
import { EventTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/event.repository_adapter';
import QueryEntitiesService from '@core/application/query_entities.service';
import {
  EventFilterParamsDTO,
  EventsFilterParamsDTO
} from '@core/domain/fighting/dto/filter_params';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import { CreateEventGateway, CreateEventInteractor } from '@core/domain/fighting/use_case/event/create_event';
import CreateEntityService from '@core/application/create_entity.service';
import { EventDetailsDTO } from '@core/domain/fighting/dto/details';
import { TransactionalUseCaseWrapper } from '@db/typeorm/transaction';
import { QueryEventGateway } from '@core/domain/fighting/use_case/event/query_event';
import QueryEntityService from '@core/application/query_entity.service';
import { QueryEventsGateway } from '@core/domain/fighting/use_case/event/query_events';
import { UpdateEventGateway, UpdateEventInteractor } from '@core/domain/fighting/use_case/event/update_event';
import UpdateEntityService from '@core/application/update_entity.service';
import { DeleteEventGateway, DeleteEventInteractor } from '@core/domain/fighting/use_case/event/delete_event';
import DeleteEntityService from '@core/application/delete_entity.service';

const providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateEventInteractor,
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
    inject: [FightingDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryEventInteractor,
    useFactory: (
      gateway: QueryEventGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<EventFilterParamsDTO, EventDTO>(
        gateway,
        EntityName.Event,
        logger
      ),
    inject: [FightingDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryEventsInteractor,
    useFactory: (
      gateway: QueryEventsGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<EventsFilterParamsDTO, EventDTO>(
        gateway,
        EntityName.Event,
        logger
      ),
    inject: [FightingDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.UpdateEventInteractor,
    useFactory: (gateway: UpdateEventGateway, logger: CoreLogger) => {
      const interactor: UpdateEventInteractor = new UpdateEntityService<EventDTO>(
        gateway,
        EntityName.Event,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.DeleteEventInteractor,
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
    inject: [FightingDITokens.EventRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.EventRepository,
    useClass: EventTypeOrmRepositoryAdapter
  }
];

@Module({
  imports: [TypeOrmModule.forFeature([EventDBEntity])],
  providers,
  controllers: [EventsController]
})
export class EventsModule {}
