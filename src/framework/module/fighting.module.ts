import { Module, Provider } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { FighterTypeOrmRepositoryAdapter } from '@db/typeorm/adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterTypeOrmRepository } from '@db/typeorm/repository';
import CreateFighterService from '@core/application/fighting/fighter/create_fighter.service';

const repository_providers: Array<Provider> = [
  {
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
];

const interactor_providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateFighterInteractor,
    useFactory: (gateway) => new CreateFighterService(gateway),
    inject: [FightingDITokens.FighterRepository],
  }
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
