import FighterRepository from '@core/domain/fighting/repository';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import {
  FighterFilterParamsDTO,
  FightersFilterParamsDTO
} from '@core/domain/fighting/dto/filter_params';
import { Nullable } from '@core/abstraction/type';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { CoreLogger } from '@core/abstraction/logging';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { toPrettyJsonString } from '@core/abstraction/format';
import { FighterMapper } from '@db/typeorm/mapper/fighter.mapper';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';

export class FighterTypeOrmRepositoryAdapter implements FighterRepository {
  private static readonly entity_name: string =  EntityName.Fighter;

  constructor(
    @InjectRepository(FighterDBEntity)
    private readonly repository: Repository<FighterDBEntity>,
    @InjectRepository(FighterStatsDBEntity)
    private readonly fighter_stats_repository: Repository<FighterStatsDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {
  }

  public async create(details_dto: FighterDetailsDTO): Promise<FighterDTO> {
    const fighter_to_save = FighterMapper.fromDetailsDTO(details_dto);
    this.logger.log(
      `➕ ${FighterTypeOrmRepositoryAdapter.entity_name} to save: ${toPrettyJsonString(fighter_to_save)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    const saved_fighter = await this.repository.save(fighter_to_save);
    this.logger.log(
      `➕ Saved ${FighterTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(saved_fighter)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    return FighterMapper.fromDBEntity(saved_fighter);
  }

  public async delete(params: FighterFilterParamsDTO): Promise<Nullable<FighterDTO> | void> {
    this.logger.log(
      `⛔ ${FighterTypeOrmRepositoryAdapter.entity_name} id to delete: ${toPrettyJsonString(params.id)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    await this.fighter_stats_repository.delete({ fighter_id: params.id });
    await this.repository.delete({ id: params.id });
    this.logger.log(
      `⛔ ${FighterTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(params.id)} deleted`,
      FighterTypeOrmRepositoryAdapter.name
    );
  }

  public async findOneBy(params: FighterFilterParamsDTO): Promise<Nullable<FighterDTO>> {
    this.logger.log(
      `🔎 Searching ${FighterTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(params.id)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    const fighter_entity = await this.repository
      .createQueryBuilder('fighter')
      .leftJoinAndSelect('fighter.stats', 'stats')
      .where('fighter.id = :id', { id: params.id })
      .getOne();
    if (!!fighter_entity) {
      this.logger.log(
        `🔎 Found ${FighterTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(fighter_entity)}`,
        FighterTypeOrmRepositoryAdapter.name
      );
      return FighterMapper.fromDBEntity(fighter_entity);
    }
    this.logger.warn(
      `🔎 The ${FighterTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(params.id)} was not found`,
      FighterTypeOrmRepositoryAdapter.name
    );
    return null;
  }

  public async exists(id: number): Promise<boolean> {
    this.logger.log(
      `🔎 Searching ${FighterTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(id)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    const fighter_dto: FighterDTO = await this.findOneBy( { id });
    const exists = !!fighter_dto;
    if (exists) {
      this.logger.log(
        `🔎 The ${FighterTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} exists`,
        FighterTypeOrmRepositoryAdapter.name
      );
    } else {
      this.logger.warn(
        `🔎 The ${FighterTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} does not exist`,
        FighterTypeOrmRepositoryAdapter.name
      );
    }
    return exists;
  }

  public async update(fighter_with_updates: FighterDTO): Promise<FighterDTO> {
    this.logger.log(
      `📝  The ${FighterTypeOrmRepositoryAdapter.entity_name} updates: ${toPrettyJsonString(fighter_with_updates)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    await this.repository.save(
      FighterMapper.fromDTO(fighter_with_updates)
    );
    const updated_fighter = await this.findOneBy({ id: fighter_with_updates.id });
    this.logger.log(
      `📝  The ${FighterTypeOrmRepositoryAdapter.entity_name} updated: ${toPrettyJsonString(updated_fighter)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    return updated_fighter;
  }

  public async findAll(params: FightersFilterParamsDTO): Promise<Array<FighterDTO>> {
    const entity_alias = 'fighter';
    const entity_fields = {
      id: 'id',
      name: 'name',
      weight_class: 'weightClass',
      nationality: 'nationality',
      team: 'team',
      stats: {
        alias: 'stats',
        fighter_id: 'fighterId'
      }
    };
    this.logger.log(
      `🔎 The ${FighterTypeOrmRepositoryAdapter.entity_name}s filter params: ${toPrettyJsonString(params)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    const queryBuilder = this.repository.createQueryBuilder(entity_alias);
    queryBuilder.leftJoinAndSelect(
      `${entity_alias}.${entity_fields.stats.alias}`,
      entity_fields.stats.alias,
      `${entity_fields.stats.alias}.${entity_fields.stats.fighter_id} = ${entity_alias}.${entity_fields.id}`
    );
    if (params.name) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.name} = :${entity_fields.name}`,
        { name: params.name }
      );
    }
    if (params.nationality) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.nationality} = :${entity_fields.nationality}`,
        { nationality: params.nationality }
      );
    }
    if (params.team) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.team} = :${entity_fields.team}`,
        { team: params.team }
      );
    }
    if (params.weight_class) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.weight_class} = :${entity_fields.weight_class}`,
        { weightClass: params.weight_class }
      );
    }
    if (params.pagination) {
      queryBuilder.skip(params.pagination.offset).take(params.pagination.limit);
    }
    const foundEntities: Array<FighterDBEntity> = await queryBuilder.getMany();
    this.logger.log(
      `🔎 The following ${FighterTypeOrmRepositoryAdapter.entity_name}s were found: ${toPrettyJsonString(foundEntities)}`,
      FighterTypeOrmRepositoryAdapter.name
    );
    return foundEntities.map((entity) => FighterMapper.fromDBEntity(entity));
  }
}
