import { Controller, Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDBEntity from '@db/typeorm/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDBEntity)
    private usersRepository: Repository<UserDBEntity>,
  ) {}

  findAll(): Promise<UserDBEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserDBEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDBEntity[]> {
    return this.usersService.findAll();
  }
}
