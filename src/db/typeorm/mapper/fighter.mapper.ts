import { FighterDTO } from '@core/domain/fighting/dto/dto';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { WeightClass } from '@core/domain/fighting/entity/enum';

export class FighterMapper {
  public static fromDBEntity(input: FighterDBEntity): FighterDTO {
    const fighter_dto: FighterDTO = {
      id: input.id,
      name: input.name,
      weight_class: input.weight_class as WeightClass,
      nationality: input.nationality,
      team: input.team,
    };
    return fighter_dto;
  }

  public static fromDetailsDTO(details_dto: FighterDetailsDTO): FighterDBEntity {
    const fighter_entity = new FighterDBEntity();
    fighter_entity.name = details_dto.name;
    fighter_entity.team = details_dto.team;
    fighter_entity.nationality = details_dto.nationality;
    fighter_entity.weight_class = details_dto.weight_class;
    return fighter_entity;
  }

  public static fromDTO(dto: FighterDTO): FighterDBEntity {
    const fighter_entity = new FighterDBEntity();
    fighter_entity.id = dto.id;
    fighter_entity.name = dto.name;
    fighter_entity.team = dto.team;
    fighter_entity.nationality = dto.nationality;
    fighter_entity.weight_class = dto.weight_class;
    return fighter_entity;
  }
}
