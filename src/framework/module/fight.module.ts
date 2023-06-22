import { Module, Provider } from '@nestjs/common';
import { QueryFightGateway, QueryFightInteractor } from '@core/domain/fighting/use_case/fight/query_fight';
import { QueryFightsGateway, QueryFightsInteractor } from '@core/domain/fighting/use_case/fight/query_fights';
import { CreateFightGateway, CreateFightInteractor } from '@core/domain/fighting/use_case/fight/create_fight';
import { UpdateFightGateway, UpdateFightInteractor } from '@core/domain/fighting/use_case/fight/update_fight';
import { DeleteFightGateway, DeleteFightInteractor } from '@core/domain/fighting/use_case/fight/delete_fight';
import { CoreLogger } from '@core/abstraction/logging';
import { FightFacadeImpl } from '@core/application/fight/fight.facade_impl';
import CoreDITokens from '@core/abstraction/di';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/enum';
import { TransactionalUseCaseWrapper } from '@db/typeorm/transaction';
import QueryEntityService from '@core/application/query_entity.service';
import { FightFilterParamsDTO, FightsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import QueryEntitiesService from '@core/application/query_entities.service';
import UpdateFightService from '@core/application/fight/update_fight.service';
import DeleteEntityService from '@core/application/delete_entity.service';
import { FighterFacade } from '@core/domain/fighting/facade/fighter.facade';
import { FightFacade } from '@core/domain/fighting/facade/fight.facade';
import { RankingFacade } from '@core/domain/fighting/facade/ranking.facade';
import { UpdateFightWithRankingService } from '@core/application/fight/update_fight_with_ranking.service';
import { FightTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/fight.repository_adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FighterModule } from '@framework/module/fighter.module';
import { RankingModule } from '@framework/module/ranking.module';
import { CreateFightService } from '@core/application/fight/create_fight.service';
import FightDITokens from '@core/domain/fighting/di/fight.di_tokens';
import FighterDITokens from '@core/domain/fighting/di/fighter.di_tokens';
import RankingDITokens from '@core/domain/fighting/di/ranking.di_tokens';

const persistence_providers: Array<Provider> = [
  {
    provide: FightDITokens.FightRepository,
    useClass: FightTypeOrmRepositoryAdapter
  }
];

const feature_providers: Array<Provider> = [
  {
    provide: FightDITokens.CreateFightInteractor,
    useFactory: (gateway: CreateFightGateway, logger: CoreLogger) => {
      const interactor: CreateFightInteractor = new CreateFightService(
        gateway,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [FightDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightDITokens.QueryFightInteractor,
    useFactory: (
      gateway: QueryFightGateway,
      logger: CoreLogger
    ) =>
      new QueryEntityService<FightFilterParamsDTO, FightDTO>(
        gateway,
        EntityName.Fight,
        logger
      ),
    inject: [FightDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightDITokens.QueryFightsInteractor,
    useFactory: (
      gateway: QueryFightsGateway,
      logger: CoreLogger
    ) =>
      new QueryEntitiesService<FightsFilterParamsDTO, FightDTO>(
        gateway,
        EntityName.Fight,
        logger
      ),
    inject: [FightDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightDITokens.UpdateFightInteractor,
    useFactory: (
      gateway: UpdateFightGateway,
      logger: CoreLogger
    ) =>  new UpdateFightService(
      gateway,
      logger
    ),
    inject: [
      FightDITokens.FightRepository,
      CoreDITokens.CoreLogger
    ]
  },
  {
    provide: FightDITokens.DeleteFightInteractor,
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
    inject: [FightDITokens.FightRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: FightDITokens.UpdateFightWithRankingInteractor,
    useFactory: (
      fight_facade: FightFacade,
      fighter_facade: FighterFacade,
      ranking_facade: RankingFacade,
      logger: CoreLogger
    ) => {
      const interactor = new UpdateFightWithRankingService(
        fight_facade,
        fighter_facade,
        ranking_facade,
        logger
      );
      return new TransactionalUseCaseWrapper(interactor);
    },
    inject: [
      FightDITokens.FightFacade,
      FighterDITokens.FighterFacade,
      RankingDITokens.RankingFacade,
      CoreDITokens.CoreLogger
    ]
  },
];

const facade_providers: Array<Provider> = [
  {
    provide: FightDITokens.FightFacade,
    useFactory: (
      q: QueryFightInteractor,
      qs: QueryFightsInteractor,
      c: CreateFightInteractor,
      u: UpdateFightInteractor,
      d: DeleteFightInteractor,
      l: CoreLogger
    ) =>
      new FightFacadeImpl(
        {
          delete_fight_interactor: d,
          update_fight_interactor: u,
          create_fight_interactor: c,
          query_fights_interactor: qs,
          query_fight_interactor: q,
          logger: l
        }
      ),
    inject: [
      FightDITokens.QueryFightInteractor,
      FightDITokens.QueryFightsInteractor,
      FightDITokens.CreateFightInteractor,
      FightDITokens.UpdateFightInteractor,
      FightDITokens.DeleteFightInteractor,
      CoreDITokens.CoreLogger
    ]
  }
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FightDBEntity]),
    FighterModule,
    RankingModule,
  ],
  providers: [
    ...persistence_providers,
    ...feature_providers,
    ...facade_providers,
  ],
  exports: [
    FightDITokens.FightRepository,
    FightDITokens.UpdateFightWithRankingInteractor,
    FightDITokens.FightFacade,
  ]
})
export class FightModule {}
