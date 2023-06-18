import { Module, Provider } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { FighterTypeOrmRepositoryAdapter } from '@db/typeorm/adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterTypeOrmRepository } from '@db/typeorm/repository';
import CreateEntityService from '@core/application/fighting/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';
import { EntityNames } from '@core/domain/fighting/entity/entity_names';

const repository_providers: Array<Provider> = [
  {
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
];

const interactor_providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateFighterInteractor,
    useFactory: (gateway) =>
      new CreateEntityService<FighterDetailsDTO, FighterDTO>(gateway, EntityNames.Fighter),
    inject: [FightingDITokens.FighterRepository],
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FighterTypeOrmRepository])
  ],
  providers: [
    ...repository_providers,
    ...interactor_providers,
  ],
  exports: [
    FightingDITokens.FighterRepository,
  ]
})
export class FightingModule {}
