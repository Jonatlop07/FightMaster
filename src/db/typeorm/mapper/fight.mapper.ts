import { FightDTO } from '@core/domain/fighting/dto/dto';
import FightDBEntity from '@db/typeorm/entity/fight';
import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import EventDBEntity from '@db/typeorm/entity/event';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { Optional } from '@core/abstraction/type';

export class FightMapper {
  public static fromDBEntity(input: FightDBEntity): FightDTO {
    return {
      id: input.id,
      event_id: input.event.id,
      fighter1_id: input.fighter1.id,
      fighter2_id: input.fighter2.id,
      winner_id: !!input.winner ? input.winner.id : null
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
    event: EventDBEntity,
    fighter1: FighterDBEntity,
    fighter2: FighterDBEntity,
    dto: FightDTO,
    winner?: Optional<FighterDBEntity>,
  ): FightDBEntity {
    return {
      id: dto.id,
      fighter1,
      fighter2,
      winner,
      event
    };
  }
}
