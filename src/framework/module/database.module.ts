import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { TypeOrmLogger } from '@db/typeorm/logger';
import { TypeOrmDirectory } from '@db/typeorm';

const getTypeOrmSettings = (config: ConfigService): TypeOrmModuleOptions => {
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
    entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`]
  };
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  getTypeOrmSettings
    })
  ]
})
export class DatabaseModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
