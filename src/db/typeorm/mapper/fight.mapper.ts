import { FightDTO } from '@core/domain/fighting/dto/dto';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import { EventMapper } from '@db/typeorm/mapper/event.mapper';
import { FighterMapper } from '@db/typeorm/mapper/fighter.mapper';

export class FightMapper {
  public static fromDBEntity(input: FightDBEntity): FightDTO {
    return {
      id: input.id,
      event: EventMapper.fromDBEntity(input.event),
      fighter1: FighterMapper.fromDBEntity(input.fighter1),
      fighter2: FighterMapper.fromDBEntity(input.fighter2),
      winner: !!input.winner
        ? FighterMapper.fromDBEntity(input.winner)
        : null
    };
  }

  public static fromDetailsDTO(details_dto: FightDetailsDTO): FightDBEntity {
    const fight_entity = new FightDBEntity();
    fight_entity.fighter1 = FighterMapper.fromDTO(details_dto.fighter1);
    fight_entity.fighter2 = FighterMapper.fromDTO(details_dto.fighter2);
    fight_entity.event = EventMapper.fromDTO(details_dto.event);
    fight_entity.winner = !!details_dto.winner
      ? FighterMapper.fromDTO(details_dto.winner)
      : null;
    return fight_entity;
  }

  public static fromDTO(fight_dto: FightDTO): FightDBEntity {
    return {
      id: fight_dto.id,
      fighter1: FighterMapper.fromDTO(fight_dto.fighter1),
      fighter2: FighterMapper.fromDTO(fight_dto.fighter2),
      winner: !!fight_dto.winner ? FighterMapper.fromDTO(fight_dto.winner) : null,
      event: EventMapper.fromDTO(fight_dto.event)
    };
  }
}
