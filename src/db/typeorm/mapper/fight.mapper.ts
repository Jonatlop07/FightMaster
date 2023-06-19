import { FightDTO } from '@core/domain/fighting/dto/dto';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import EventDBEntity from '@db/typeorm/entity/event';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { Optional } from '@core/abstraction/type';
import { EventMapper } from '@db/typeorm/mapper/event.mapper';
import { FighterMapper } from '@db/typeorm/mapper/fighter.mapper';

export class FightMapper {
  public static fromDBEntity(input: FightDBEntity): FightDTO {
    return {
      id: input.id,
      event: EventMapper.fromDTO(input.event),
      fighter1: FighterMapper.fromDBEntity(input.fighter1),
      fighter2: FighterMapper.fromDBEntity(input.fighter2),
      winner: !!input.winner ? FighterMapper.fromDBEntity(input.winner) : null
    };
  }

  public static fromDetailsDTO(
    event: EventDBEntity,
    fighter1: FighterDBEntity,
    fighter2: FighterDBEntity,
    details_dto: FightDetailsDTO,
    winner?: Optional<FighterDBEntity>,
  ): FightDBEntity {
    const fight_entity = new FightDBEntity();
    fight_entity.fighter1 = fighter1;
    fight_entity.fighter2 = fighter2;
    fight_entity.event = event;
    fight_entity.winner = winner;
    return fight_entity;
  }

  public static fromDTO(
    fight_dto: FightDTO,
  ): FightDBEntity {
    return {
      id: fight_dto.id,
      fighter1: FighterMapper.fromDTO(fight_dto.fighter1),
      fighter2: FighterMapper.fromDTO(fight_dto.fighter2),
      winner: !!fight_dto.winner ? FighterMapper.fromDTO(fight_dto.winner) : null,
      event: EventMapper.fromDTO(fight_dto.event)
    };
  }
}
