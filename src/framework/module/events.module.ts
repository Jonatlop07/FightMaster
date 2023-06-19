import { EventsController } from '@framework/api/http_rest/controller/event.controller';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDBEntity from '@db/typeorm/entity/event';
import FightingDITokens from '@core/domain/fighting/di';
import { EventTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/event.repository_adapter';
import QueryEntitiesService from '@core/application/query_entities.service';
import {
  EventFilterParamsDTO,
  EventsFilterParamsDTO, FightFilterParamsDTO, FightsFilterParamsDTO
} from '@core/domain/fighting/dto/filter_params';
import { EventDTO, FightDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import { CreateEventGateway, CreateEventInteractor } from '@core/domain/fighting/use_case/event/create_event';
import CreateEntityService from '@core/application/create_entity.service';
import { EventDetailsDTO, FightDetailsDTO } from '@core/domain/fighting/dto/details';
import { TransactionalUseCaseWrapper } from '@db/typeorm/transaction';
import { QueryEventGateway } from '@core/domain/fighting/use_case/event/query_event';
import QueryEntityService from '@core/application/query_entity.service';
import { QueryEventsGateway } from '@core/domain/fighting/use_case/event/query_events';
import { UpdateEventGateway, UpdateEventInteractor } from '@core/domain/fighting/use_case/event/update_event';
import UpdateEntityService from '@core/application/update_entity.service';
import { DeleteEventGateway, DeleteEventInteractor } from '@core/domain/fighting/use_case/event/delete_event';
import DeleteEntityService from '@core/application/delete_entity.service';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FightTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/fight.repository_adapter';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { FighterModule } from '@framework/module/fighter.module';
import { CreateFightGateway, CreateFightInteractor } from '@core/domain/fighting/use_case/fight/create_fight';
import { DeleteFightGateway, DeleteFightInteractor } from '@core/domain/fighting/use_case/fight/delete_fight';
import { UpdateFightGateway, UpdateFightInteractor } from '@core/domain/fighting/use_case/fight/update_fight';
import { QueryFightsGateway } from '@core/domain/fighting/use_case/fight/query_fights';
import { QueryFightGateway } from '@core/domain/fighting/use_case/fight/query_fight';
import UpdateFightService from '@core/application/fight/update_fight.service';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';

const event_feature_providers = [
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
];

const fight_feature_providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateFightInteractor,
    useFactory: (gateway: CreateFightGateway, logger: CoreLogger) => {
      const interactor: CreateFightInteractor = new CreateEntityService<
        FightDetailsDTO,
        FightDTO
        >(
        gateway,
        EntityName.Fight,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryFightInteractor,
    useFactory: (
      gateway: QueryFightGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<FightFilterParamsDTO, FightDTO>(
        gateway,
        EntityName.Fight,
        logger
      ),
    inject: [FightingDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryFightsInteractor,
    useFactory: (
      gateway: QueryFightsGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<FightsFilterParamsDTO, FightDTO>(
        gateway,
        EntityName.Fight,
        logger
      ),
    inject: [FightingDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.UpdateFightInteractor,
    useFactory: (
      gateway: UpdateFightGateway,
      fighter_gateway: QueryFighterGateway,
      logger: CoreLogger
    ) => {
      const interactor: UpdateFightInteractor = new UpdateFightService(
        gateway,
        fighter_gateway,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [
      FightingDITokens.FightRepository,
      FightingDITokens.FighterRepository,
      CoreDITokens.CoreLogger
    ]
  },
  {
    provide: FightingDITokens.DeleteFightInteractor,
    useFactory: (
      gateway: DeleteFightGateway,
      logger: CoreLogger
    ) => {
      const interactor: DeleteFightInteractor = new DeleteEntityService<
        FightFilterParamsDTO,
        FightDTO
        >(
        gateway,
        EntityName.Fight,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
];

const persistence_providers: Array<Provider> = [
  {
    provide: FightingDITokens.EventRepository,
    useClass: EventTypeOrmRepositoryAdapter
  },
  {
    provide: FightingDITokens.FightRepository,
    useClass: FightTypeOrmRepositoryAdapter
  }
];

@Module({
  imports: [
    TypeOrmModule.forFeature([EventDBEntity, FightDBEntity, FighterDBEntity]),
    FighterModule
  ],
  providers: [
    ...persistence_providers,
    ...event_feature_providers,
    ...fight_feature_providers
  ],
  controllers: [EventsController]
})
export class EventsModule {}
