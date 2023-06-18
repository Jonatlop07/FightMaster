import FighterRepository from '@core/domain/fighting/repository';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FighterTypeOrmRepository } from '@db/typeorm/repository';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { Nullable } from '@core/abstraction/type';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { Mapper } from '@core/domain/fighting/mapper';

export class FighterTypeOrmRepositoryAdapter implements FighterRepository {
  constructor(
    @InjectRepository(FighterTypeOrmRepository)
    private readonly repository: FighterTypeOrmRepository
  ) {}

  public async create(details_dto: FighterDetailsDTO): Promise<FighterDTO> {
    const fighter_entity = this.repository.create(details_dto);
    await this.repository.save(fighter_entity);
    return Mapper.fromFighterDBEntity(fighter_entity);
  }

  public async delete(params: FighterFilterParamsDTO): Promise<Nullable<FighterDTO> | void> {
    await this.repository.delete({ id: params.id });
  }

  public async findOneBy(params: FighterFilterParamsDTO): Promise<Nullable<FighterDTO>> {
    const fighter_entity: FighterDBEntity = await this.repository.findOneBy( {
      id: params.id,
    });
    if (!!fighter_entity) {
      return Mapper.fromFighterDBEntity(fighter_entity);
    }
    return null;
  }

  public async exists(params: FighterFilterParamsDTO): Promise<boolean> {
    const fighter_dto: FighterDTO = await this.findOneBy( {
      id: params.id,
    });
    return !!fighter_dto;
  }

  public async update(fighter_with_updates: FighterDTO): Promise<FighterDTO> {
    const updated_fighter: FighterDBEntity = await this.repository.save(
      Mapper.fromFighterDTO(fighter_with_updates)
    );
    return Mapper.fromFighterDBEntity(updated_fighter);
  }
}
