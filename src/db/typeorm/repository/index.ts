import { Repository } from 'typeorm';
import UserDBEntity from '@db/typeorm/entity/user';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import EventDBEntity from '@db/typeorm/entity/event';
import RankingDBEntity from '@db/typeorm/entity/ranking';
import FightDBEntity from '@db/typeorm/entity/fight';

class UserTypeOrmRepository extends Repository<UserDBEntity> {}

class FighterTypeOrmRepository extends Repository<FighterDBEntity> {
  public async saveEntity(entity: FighterDBEntity): Promise<FighterDBEntity> {
    return await this.save(entity);
  }
}

class FightTypeOrmRepository extends Repository<FightDBEntity> {}

class EventTypeOrmRepository extends Repository<EventDBEntity> {}

class RankingTypeOrmRepository extends Repository<RankingDBEntity> {}

export {
  UserTypeOrmRepository,
  FighterTypeOrmRepository,
  FightTypeOrmRepository,
  EventTypeOrmRepository,
  RankingTypeOrmRepository,
};
