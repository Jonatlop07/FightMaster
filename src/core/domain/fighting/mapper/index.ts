import { FighterDTO, FighterStatsDTO } from '@core/domain/fighting/dto/dto';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';

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

  public static fromFighterDetailsDTO(details_dto: FighterDetailsDTO): FighterDBEntity {
    const stats_entity = new FighterStatsDBEntity();
    stats_entity.wins = details_dto.stats.wins;
    stats_entity.losses = details_dto.stats.losses;
    stats_entity.knockouts = details_dto.stats.knockouts;
    stats_entity.submissions = details_dto.stats.submissions;
    const fighter_entity = new FighterDBEntity();
    fighter_entity.name = details_dto.name;
    fighter_entity.team = details_dto.team;
    fighter_entity.nationality = details_dto.nationality;
    fighter_entity.weight_class = details_dto.weight_class;
    fighter_entity.stats = stats_entity;
    return fighter_entity;
  }

  public static fromFighterDTO(dto: FighterDTO): FighterDBEntity {
    const fighter_entity = new FighterDBEntity();
    fighter_entity.id = dto.id;
    fighter_entity.name = dto.name;
    fighter_entity.team = dto.team;
    fighter_entity.nationality = dto.nationality;
    fighter_entity.weight_class = dto.weight_class;
    const stats_entity = new FighterStatsDBEntity();
    stats_entity.fighter_id = dto.stats.fighter_id;
    stats_entity.wins = dto.stats.wins;
    stats_entity.losses = dto.stats.losses;
    stats_entity.knockouts = dto.stats.knockouts;
    stats_entity.submissions = dto.stats.submissions;
    stats_entity.fighter = fighter_entity;
    return fighter_entity;
  }

  static fromFighterStatsDBEntity(input: FighterStatsDBEntity): FighterStatsDTO {
    const stats_dto: FighterStatsDTO = {
      fighter_id: input.fighter_id,
      wins: input.wins,
      losses: input.losses,
      knockouts: input.knockouts,
      submissions: input.submissions,
    };
    return stats_dto;
  }
}
