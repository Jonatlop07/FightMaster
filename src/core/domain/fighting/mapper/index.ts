import { Fight } from '@core/domain/fighting/entity/fight';
import { EventDTO, FightDTO, FighterDTO, FighterStatsDTO } from '@core/domain/fighting/dto/dto';
import { Event } from '@core/domain/fighting/entity/event';
import { Fighter } from '@core/domain/fighting/entity/fighter';
import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';

export class CoreFighterStatsMapper {
  public static async fromDTO(dto: FighterStatsDTO): Promise<FighterStats> {
    return await FighterStats.new({
      id: dto.fighter_id,
      wins: dto.wins,
      losses: dto.losses,
      knockouts: dto.knockouts,
      tech_knockouts: dto.tech_knockouts,
      submissions: dto.submissions,
      by_decision: dto.by_decision
    });
  }
}

class CoreFighterMapper {
  public static async fromDTO(dto: FighterDTO): Promise<Fighter> {
    return await Fighter.new({
      id: dto.id,
      name: dto.name,
      weight_class: dto.weight_class,
      nationality: dto.nationality,
      team: dto.team
    });
  }
}

class CoreEventMapper {
  public static async fromDTO(dto: EventDTO): Promise<Event> {
    return await Event.new({
      id: dto.id,
      date: dto.date,
      name: dto.name,
      location: dto.location
    });
  }
}

export class CoreFightMapper {
  public static async fromDTO(dto: FightDTO): Promise<Fight> {
    return await Fight.new({
      id: dto.id,
      event: await CoreEventMapper.fromDTO(dto.event),
      fighter1: await CoreFighterMapper.fromDTO(dto.fighter1),
      fighter2: await CoreFighterMapper.fromDTO(dto.fighter2),
      winner: !!dto.winner ? await CoreFighterMapper.fromDTO(dto.winner) : null,
      win_method: !!dto.win_method ? dto.win_method : null
    });
  }
}


