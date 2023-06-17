import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../../config/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`,
    }),
  ]
})
export class RootModule {}
