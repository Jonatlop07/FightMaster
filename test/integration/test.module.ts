import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { TypeOrmLogger } from '@db/typeorm/logger';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';
import { FighterTypeOrmRepository } from '@db/typeorm/repository';
import FightingDITokens from '@core/domain/fighting/di';
import { FighterTypeOrmRepositoryAdapter } from '@db/typeorm/adapter';
import CreateEntityService from '@core/application/fighting/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';
import { EntityNames } from '@core/domain/fighting/entity/entity_names';

const getTypeOrmTestSettings = (config: ConfigService): TypeOrmModuleOptions => {
  const type = config.get('DATABASE_TYPE');
  const username = config.get('DATABASE_USERNAME');
  const password = config.get('DATABASE_PASSWORD');
  const host = config.get('DATABASE_HOST');
  const port = config.get('DATABASE_PORT');
  const database = config.get('DATABASE_NAME');
  const enable_log = config.get('DATABASE_ENABLE_LOG');
  return {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    autoLoadEntities: true,
    logging: enable_log === 'true' ? 'all' : false,
    logger: enable_log  === 'true' ? TypeOrmLogger.new() : undefined,
    entities: [FighterDBEntity, FighterStatsDBEntity],
  };
};

const repository_providers: Array<Provider> = [
  {
    provide: FightingDITokens.FighterRepository,
    useClass: FighterTypeOrmRepositoryAdapter,
  },
];

const interactor_providers: Array<Provider> = [
  {
    provide: FightingDITokens.CreateFighterInteractor,
    useFactory: (gateway) => new CreateEntityService<FighterDetailsDTO, FighterDTO>(gateway, EntityNames.Fighter),
    inject: [FightingDITokens.FighterRepository],
  }
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmTestSettings
    }),
    TypeOrmModule.forFeature([FighterTypeOrmRepository]),
  ],
  providers: [
    ...repository_providers,
    ...interactor_providers,
  ]
})
export class TestModule {}
