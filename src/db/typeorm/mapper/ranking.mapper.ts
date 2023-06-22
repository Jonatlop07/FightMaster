import RankingDBEntity from '@db/typeorm/entity/ranking';
import { RankingDTO } from '@core/domain/fighting/dto/dto';
import { WeightClass } from '@core/domain/fighting/entity/enum';
import { FighterMapper } from '@db/typeorm/mapper/fighter.mapper';
import { RankingDetailsDTO } from '@core/domain/fighting/dto/details';

export class RankingMapper {
  public static fromDetailsDTO(details_dto: RankingDetailsDTO): RankingDBEntity {
    const ranking_entity = new RankingDBEntity();
    ranking_entity.rank = details_dto.rank;
    ranking_entity.weight_class = details_dto.weight_class;
    ranking_entity.fighter = details_dto.fighter;
    return ranking_entity;
  }

  public static fromDBEntity(entity: RankingDBEntity): RankingDTO {
    const ranking_dto: RankingDTO = {
      id: entity.id,
      rank: entity.rank,
      weight_class: entity.weight_class as WeightClass,
      fighter: FighterMapper.fromDBEntity(entity.fighter),
    };
    return ranking_dto;
  }

  public static fromDTO(dto: RankingDTO): RankingDBEntity {
    return {
      id: dto.id,
      rank: dto.rank,
      weight_class: dto.weight_class.toString(),
      fighter: FighterMapper.fromDTO(dto.fighter)
    };
  }
}
