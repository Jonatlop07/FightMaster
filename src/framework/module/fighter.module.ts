import { Module, Provider } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreateEntityService from '@core/application/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { FighterController } from '@framework/api/http_rest/controller/fighter.controller';
import { CreateFighterGateway, CreateFighterInteractor } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { FighterTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/fighter.repository_adapter';
import { TransactionalUseCaseWrapper } from '@db/typeorm/transaction';
import { QueryFighterGateway, QueryFighterInteractor } from '@core/domain/fighting/use_case/fighter/query_fighter';
import QueryEntityService from '@core/application/query_entity.service';
import { FighterFilterParamsDTO, FightersFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { QueryFightersGateway, QueryFightersInteractor } from '@core/domain/fighting/use_case/fighter/query_fighters';
import QueryEntitiesService from '@core/application/query_entities.service';
import { UpdateFighterGateway, UpdateFighterInteractor } from '@core/domain/fighting/use_case/fighter/update_fighter';
import UpdateEntityService from '@core/application/update_entity.service';
import { DeleteFighterGateway, DeleteFighterInteractor } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import DeleteEntityService from '@core/application/delete_entity.service';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';
import { FighterFacadeImpl } from '@core/application/fighter/fighter.facade_impl';

const persistence_providers: Array<Provider> = [
  {
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
];

const interactor_providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateFighterInteractor,
    useFactory: (gateway: CreateFighterGateway, logger: CoreLogger) => {
      const interactor: CreateFighterInteractor = new CreateEntityService<
        FighterDetailsDTO,
        FighterDTO
      >(
        gateway,
        EntityName.Fighter,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryFighterInteractor,
    useFactory: (
      gateway: QueryFighterGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<FighterFilterParamsDTO, FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      ),
    inject: [FightingDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.QueryFightersInteractor,
    useFactory: (
      gateway: QueryFightersGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<FightersFilterParamsDTO, FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      ),
    inject: [FightingDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.UpdateFighterInteractor,
    useFactory: (gateway: UpdateFighterGateway, logger: CoreLogger) => {
      const interactor: UpdateFighterInteractor = new UpdateEntityService<FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightingDITokens.DeleteFighterInteractor,
    useFactory: (
      gateway: DeleteFighterGateway,
      logger: CoreLogger
    ) => {
      const interactor: DeleteFighterInteractor = new DeleteEntityService<
        FighterFilterParamsDTO,
        FighterDTO
        >(
        gateway,
        EntityName.Fighter,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightingDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
];

const facade_providers: Array<Provider> = [
  {
    provide: FightingDITokens.FighterFacade,
    useFactory: (
      q: QueryFighterInteractor,
      qs: QueryFightersInteractor,
      c: CreateFighterInteractor,
      u: UpdateFighterInteractor,
      d: DeleteFighterInteractor,
      l: CoreLogger
    ) =>
      new FighterFacadeImpl(
        {
          delete_fighter_interactor: d,
          update_fighter_interactor: u,
          create_fighter_interactor: c,
          query_fighters_interactor: qs,
          query_fighter_interactor: q,
          logger: l
        }
      ),
    inject: [
      FightingDITokens.QueryFighterInteractor,
      FightingDITokens.QueryFightersInteractor,
      FightingDITokens.CreateFighterInteractor,
      FightingDITokens.UpdateFighterInteractor,
      FightingDITokens.DeleteFighterInteractor,
      CoreDITokens.CoreLogger
    ]
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([FighterDBEntity, FighterStatsDBEntity])],
  providers: [
    ...persistence_providers,
    ...interactor_providers,
    ...facade_providers
  ],
  exports: [
    FightingDITokens.FighterRepository,
    FightingDITokens.FighterFacade
  ],
  controllers: [FighterController]
})
export class FighterModule {}
