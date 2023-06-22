import { Module, Provider } from '@nestjs/common';
import {
  QueryWeightClassRankingGateway,
  QueryWeightClassRankingInteractor
} from '@core/domain/fighting/use_case/ranking/query_weight_class_ranking';
import { CoreLogger } from '@core/abstraction/logging';
import { RankingFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { RankingDTO } from '@core/domain/fighting/dto/dto';
import { EntityName } from '@core/domain/fighting/entity/enum';
import QueryEntitiesService from '@core/application/query_entities.service';
import CoreDITokens from '@core/abstraction/di';
import { RankingFacadeImpl } from '@core/application/ranking/ranking_facade.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import RankingDBEntity from '@db/typeorm/entity/ranking';
import { RankingTypeOrmRepositoryAdapter } from '@db/typeorm/adapter/ranking.repository_adapter';
import { UpdateRankingGateway, UpdateRankingInteractor } from '@core/domain/fighting/use_case/ranking/update_ranking';
import { UpdateRankingService } from '@core/application/ranking/update_ranking.service';
import {
  CreateFighterRankingGateway,
  CreateFighterRankingInteractor
} from '@core/domain/fighting/use_case/ranking/create_fighter_ranking.service';
import { CreateFighterRankingService } from '@core/application/ranking/create_fighter_ranking.service';
import RankingDITokens from '@core/domain/fighting/di/ranking.di_tokens';

const persistence_providers: Array<Provider> = [
  {
    provide: RankingDITokens.RankingRepository,
    useClass: RankingTypeOrmRepositoryAdapter
  },
];

const feature_providers: Array<Provider> = [
  {
    provide: RankingDITokens.QueryWeightClassRankingInteractor,
    useFactory: (
      gateway: QueryWeightClassRankingGateway,
      logger: CoreLogger
    ) => new QueryEntitiesService<RankingFilterParamsDTO, RankingDTO>(
      gateway,
      EntityName.Ranking,
      logger
    ),
    inject: [RankingDITokens.RankingRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: RankingDITokens.UpdateRankingInteractor,
    useFactory: (
      gateway: UpdateRankingGateway,
      logger: CoreLogger
    ) => new UpdateRankingService(
      gateway,
      logger
    ),
    inject: [RankingDITokens.RankingRepository, CoreDITokens.CoreLogger]
  },
  {
    provide: RankingDITokens.CreateFighterRankingInteractor,
    useFactory: (
      gateway: CreateFighterRankingGateway,
      logger: CoreLogger
    ) => new CreateFighterRankingService(
      gateway,
      logger
    ),
    inject: [RankingDITokens.RankingRepository, CoreDITokens.CoreLogger]
  }
];

const facade_providers: Array<Provider> = [
  {
    provide: RankingDITokens.RankingFacade,
    useFactory: (
      q: QueryWeightClassRankingInteractor,
      u: UpdateRankingInteractor,
      c: CreateFighterRankingInteractor,
      l: CoreLogger
    ) => new RankingFacadeImpl({
      query_weight_class_ranking_interactor: q,
      update_ranking_interactor: u,
      create_fighter_ranking_interactor: c,
      logger: l
    }),
    inject: [
      RankingDITokens.QueryWeightClassRankingInteractor,
      RankingDITokens.UpdateRankingInteractor,
      RankingDITokens.CreateFighterRankingInteractor,
      CoreDITokens.CoreLogger
    ]
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([RankingDBEntity])
  ],
  providers: [
    ...persistence_providers,
    ...feature_providers,
    ...facade_providers
  ],
  exports: [
    RankingDITokens.RankingFacade
  ]
})
export class RankingModule {}
