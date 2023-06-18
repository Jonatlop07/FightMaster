import { Repository } from 'typeorm';

import UserDBEntity from '@infrastructure/typeorm/entity/user';
import FighterDBEntity from '@infrastructure/typeorm/entity/fighter';
import FighterStatsDBEntity from '@infrastructure/typeorm/entity/fighter_stats';
import FightDBEntity from '@infrastructure/typeorm/entity/fight';
import EventDBEntity from '@infrastructure/typeorm/entity/event';
import RankingDBEntity from '@infrastructure/typeorm/entity/ranking';

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
