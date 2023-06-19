import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../../config/environments';
import { DatabaseModule } from '@framework/module/database.module';
import { FighterModule } from '@framework/module/fighter.module';
import { LoggingModule } from '@framework/module/logging.module';
import { UsersModule } from '@framework/module/users.module';
import { EventsModule } from '@framework/module/events.module';
import { SettingsModule } from '@framework/module/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `/env/app/${setEnvironment()}`,
    }),
    SettingsModule,
    DatabaseModule,
    LoggingModule,
    FighterModule,
    UsersModule,
    EventsModule,
  ],
})
export class RootModule {}
