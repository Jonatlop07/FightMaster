import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreateEntityService from '@core/application/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/enum';
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
import { FighterFacadeImpl } from '@core/application/fighter/fighter.facade_impl';
import { RankingModule } from '@framework/module/ranking.module';
import {
  QueryFighterStatsGateway,
  QueryFighterStatsInteractor
} from '@core/domain/fighting/use_case/fight/query_fighter_stats';
import { QueryFighterStatsService } from '@core/application/fighter/query_fighter_stats.service';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FightTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/fight.repository_adapter';
import FighterDITokens from '@core/domain/fighting/di/fighter.di_tokens';
import FightDITokens from '@core/domain/fighting/di/fight.di_tokens';

const persistence_providers: Array<Provider> = [
  {
    provide: FighterDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
  {
    provide: FightDITokens.FightRepository,
    useClass: FightTypeOrmRepositoryAdapter
  }
];

const interactor_providers: Array<Provider> = [
  {
    provide: FighterDITokens.CreateFighterInteractor,
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
    inject: [FighterDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FighterDITokens.QueryFighterInteractor,
    useFactory: (
      gateway: QueryFighterGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<FighterFilterParamsDTO, FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      ),
    inject: [FighterDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FighterDITokens.QueryFightersInteractor,
    useFactory: (
      gateway: QueryFightersGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<FightersFilterParamsDTO, FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      ),
    inject: [FighterDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FighterDITokens.UpdateFighterInteractor,
    useFactory: (gateway: UpdateFighterGateway, logger: CoreLogger) => {
      const interactor: UpdateFighterInteractor = new UpdateEntityService<FighterDTO>(
        gateway,
        EntityName.Fighter,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FighterDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FighterDITokens.DeleteFighterInteractor,
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
    inject: [FighterDITokens.FighterRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FighterDITokens.QueryFighterStatsInteractor,
    useFactory: (
      gateway: QueryFighterStatsGateway,
      logger: CoreLogger
    ) => new QueryFighterStatsService(gateway, logger),
    inject: [FightDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
];

const facade_providers: Array<Provider> = [
  {
    provide: FighterDITokens.FighterFacade,
    useFactory: (
      q: QueryFighterInteractor,
      qs: QueryFightersInteractor,
      c: CreateFighterInteractor,
      u: UpdateFighterInteractor,
      d: DeleteFighterInteractor,
      qfs: QueryFighterStatsInteractor,
      l: CoreLogger
    ) =>
      new FighterFacadeImpl(
        {
          delete_fighter_interactor: d,
          update_fighter_interactor: u,
          create_fighter_interactor: c,
          query_fighters_interactor: qs,
          query_fighter_interactor: q,
          query_fighter_stats_interactor: qfs,
          logger: l
        }
      ),
    inject: [
      FighterDITokens.QueryFighterInteractor,
      FighterDITokens.QueryFightersInteractor,
      FighterDITokens.CreateFighterInteractor,
      FighterDITokens.UpdateFighterInteractor,
      FighterDITokens.DeleteFighterInteractor,
      FighterDITokens.QueryFighterStatsInteractor,
      CoreDITokens.CoreLogger
    ]
  },
];

@Module({
  imports: [
    RankingModule,
    TypeOrmModule.forFeature([FighterDBEntity, FightDBEntity])
  ],
  providers: [
    ...persistence_providers,
    ...interactor_providers,
    ...facade_providers
  ],
  exports: [
    FighterDITokens.FighterRepository,
    FighterDITokens.FighterFacade
  ],
  controllers: [FighterController]
})
export class FighterModule {}
