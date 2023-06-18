import { Logger as NestLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../../config/environments';
import { DatabaseModule } from '@framework/module/database.module';
import { FightingModule } from '@framework/module/fighting.module';
import CoreDITokens from '@core/abstraction/di';
import Logger from '@core/shared/logging';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `/env/app/${setEnvironment()}`,
    }),
    DatabaseModule,
    FightingModule,
  ],
  providers: [
    {
      provide: CoreDITokens.CoreLogger,
      useFactory: (loggerService) => new Logger(loggerService),
      inject: [NestLogger]
    }
  ]
})
export class RootModule {}
