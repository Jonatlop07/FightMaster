import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDirectory } from '@infrastructure/adapter/typeorm';
import { TypeOrmLogger } from '@infrastructure/adapter/typeorm/logger';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  (config) => {
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
      }
    })
  ]
})
export class DatabaseModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
