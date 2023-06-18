import { FighterDTO, FighterStatsDTO } from '@core/domain/fighting/dto';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';

export class Mapper {
  public static fromFighterDBEntity(input: FighterDBEntity): FighterDTO {
    const fighter_dto: FighterDTO = {
      id: input.id,
      name: input.name,
      weight_class: input.weight_class,
      nationality: input.nationality,
      team: input.team,
      stats: this.fromFighterStatsDBEntity(input.stats),
    };
    return fighter_dto;
  }

  public static fromFighterDTO(input: FighterDTO): FighterDBEntity {
    const fighter_db_entity: FighterDBEntity = {
      id: input.id,
      stats: this.fromFighterStatsDTO(input.stats, input),
      name: input.name,
      weight_class: input.weight_class,
      nationality: input.nationality,
      team: input.team,
    };
    return fighter_db_entity;
  }

  static fromFighterStatsDBEntity(input: FighterStatsDBEntity): FighterStatsDTO {
    const stats_dto: FighterStatsDTO = {
      id: input.id,
      wins: input.wins,
      losses: input.losses,
      knockouts: input.knockouts,
      submissions: input.submissions,
    };
    return stats_dto;
  }

  public static fromFighterStatsDTO(
    input: FighterStatsDTO,
    fighter: FighterDTO
  ): FighterStatsDBEntity {
    const stats_db_entity: FighterStatsDBEntity = {
      id: input.id,
      wins: input.wins,
      losses: input.losses,
      knockouts: input.knockouts,
      submissions: input.submissions,
      fighter: this.fromFighterDTO(fighter)
    };
    return stats_db_entity;
  }
}
