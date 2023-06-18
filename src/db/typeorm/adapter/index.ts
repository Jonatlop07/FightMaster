import FighterRepository from '@core/domain/fighting/repository';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details.dto';
import { FighterDTO } from '@core/domain/fighting/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FighterTypeOrmRepository } from '@db/typeorm/repository';

export class FighterTypeOrmRepositoryAdapter implements FighterRepository {
  constructor(
    @InjectRepository(FighterTypeOrmRepository)
    private readonly repository: FighterTypeOrmRepository
  ) {}

  public async create(details_dto: FighterDetailsDTO): Promise<FighterDTO> {
    const fighter_entity = this.repository.create(details_dto);
    await this.repository.save(fighter_entity);
    const fighter_dto: FighterDTO = {
      id: fighter_entity.id,
      stats: fighter_entity.stats,
      name: fighter_entity.name,
      weight_class: fighter_entity.weight_class,
      nationality: fighter_entity.nationality,
      team: fighter_entity.team,
    };
    return fighter_dto;
  }
}
