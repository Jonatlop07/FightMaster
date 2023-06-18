import { Repository } from 'typeorm';
import UserDBEntity from '@db/typeorm/entity/user';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';
import EventDBEntity from '@db/typeorm/entity/event';
import RankingDBEntity from '@db/typeorm/entity/ranking';
import FightDBEntity from '@db/typeorm/entity/fight';

class UserTypeOrmRepository extends Repository<UserDBEntity> {}

class FighterTypeOrmRepository extends Repository<FighterDBEntity> {}

class FighterStatsTypeOrmRepository extends Repository<FighterStatsDBEntity> {}

class FightTypeOrmRepository extends Repository<FightDBEntity> {}

class EventTypeOrmRepository extends Repository<EventDBEntity> {}

class RankingTypeOrmRepository extends Repository<RankingDBEntity> {}

export {
  UserTypeOrmRepository,
  FighterTypeOrmRepository,
  FighterStatsTypeOrmRepository,
  FightTypeOrmRepository,
  EventTypeOrmRepository,
  RankingTypeOrmRepository,
};
