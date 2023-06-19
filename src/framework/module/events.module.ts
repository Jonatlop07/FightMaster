import { EventsController } from '@framework/api/http_rest/controller/event.controller';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDBEntity from '@db/typeorm/entity/event';
import FightingDITokens from '@core/domain/fighting/di';
import { EventTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/event.repository_adapter';
import QueryEntitiesService from '@core/application/fighting/query_entities.service';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { QueryEventsGateway } from '@core/domain/fighting/use_case/event/query_events';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';

const providers: Array<Provider> = [
  {
    provide: FightingDITokens.QueryEventsInteractor,
    useFactory: (gateway: QueryEventsGateway, logger: CoreLogger) =>
      new QueryEntitiesService<EventFilterParamsDTO, EventDTO>(
        gateway,
        EntityName.Event,
        logger
      ),
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
