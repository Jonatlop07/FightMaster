import { Module, Provider } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreateEntityService from '@core/application/fighting/create_entity.service';
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
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  }
];

@Module({
  imports: [TypeOrmModule.forFeature([FighterDBEntity])],
  providers,
  controllers: [FighterController]
})
export class FighterModule {}
