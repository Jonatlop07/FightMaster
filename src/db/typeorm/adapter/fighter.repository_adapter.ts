import FighterRepository from '@core/domain/fighting/repository';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { Nullable } from '@core/abstraction/type';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { Mapper } from '@core/domain/fighting/mapper';
import { CoreLogger } from '@core/abstraction/logging';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { toPrettyJsonString } from '@core/abstraction/format';

export class FighterTypeOrmRepositoryAdapter implements FighterRepository {
  constructor(
    @InjectRepository(FighterDBEntity)
    private readonly repository: Repository<FighterDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {
  }

  public async create(details_dto: FighterDetailsDTO): Promise<FighterDTO> {
    const fighter_to_save = Mapper.fromFighterDetailsDTO(details_dto);
    this.logger.log(
      `➕ Fighter to save: ${toPrettyJsonString(fighter_to_save)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    const saved_fighter = await this.repository.save(fighter_to_save);
    this.logger.log(
      `➕ Saved fighter: ${toPrettyJsonString(saved_fighter)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    return Mapper.fromFighterDBEntity(saved_fighter);
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
