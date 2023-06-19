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
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';
import QueryEntityService from '@core/application/query_entity.service';
import { FighterFilterParamsDTO, FightersFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { QueryFightersGateway } from '@core/domain/fighting/use_case/fighter/query_fighters';
import QueryEntitiesService from '@core/application/query_entities.service';
import { UpdateFighterGateway, UpdateFighterInteractor } from '@core/domain/fighting/use_case/fighter/update_fighter';
import UpdateEntityService from '@core/application/update_entity.service';
import { DeleteFighterGateway, DeleteFighterInteractor } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import DeleteEntityService from '@core/application/delete_entity.service';
import { FighterStatsTypeOrmRepository } from '@db/typeorm/repository';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';

const providers: Array<Provider> = [
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
  {
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([FighterDBEntity, FighterStatsDBEntity])],
  providers,
  controllers: [FighterController]
})
export class FighterModule {}
