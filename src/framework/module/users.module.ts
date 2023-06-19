import { UsersController, UsersService } from '@framework/api/http_rest/controller/user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserDBEntity from '@db/typeorm/entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([UserDBEntity])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
