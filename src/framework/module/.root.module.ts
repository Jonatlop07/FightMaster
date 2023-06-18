import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../../config/environments';
import { DatabaseModule } from '@framework/module/database.module';
import { FightingModule } from '@framework/module/fighting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `/env/app/${setEnvironment()}`,
    }),
    DatabaseModule,
    FightingModule,
  ]
})
export class RootModule {}
