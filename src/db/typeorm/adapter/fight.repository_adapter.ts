import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import {
  FightFilterParamsDTO,
  FightsFilterParamsDTO
} from '@core/domain/fighting/dto/filter_params';
import { Nullable, Optional } from '@core/abstraction/type';
import FightDBEntity from '@db/typeorm/entity/fight';
import { CoreLogger } from '@core/abstraction/logging';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { toPrettyJsonString } from '@core/abstraction/format';
import { FightMapper } from '@db/typeorm/mapper/fight.mapper';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import EventDBEntity from '@db/typeorm/entity/event';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { FightRepository } from '@core/domain/fighting/repository';

const entity_alias = 'fight';
const entity_fields = {
  id: 'id',
  event: 'event',
  fighter1: 'fighter1',
  fighter2: 'fighter2',
  winner: 'winner',
};

const fighter_alias = 'fighter';
const fighter_fields = {
  id: 'id',
  stats: {
    alias: 'stats',
  }
};

export class FightTypeOrmRepositoryAdapter implements FightRepository {
  private static readonly entity_name: string =  EntityName.Fight;

  constructor(
    @InjectRepository(FightDBEntity)
    private readonly repository: Repository<FightDBEntity>,
    @InjectRepository(EventDBEntity)
    private readonly event_repository: Repository<EventDBEntity>,
    @InjectRepository(FighterDBEntity)
    private readonly fighter_repository: Repository<FighterDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {
  }

  public async create(details_dto: FightDetailsDTO): Promise<FightDTO> {
    const event_entity = await this.findEventById(details_dto.event_id);
    const fighter1_entity: FighterDBEntity = await this.findFighterById(details_dto.fighter1_id);
    const fighter2_entity: FighterDBEntity = await this.findFighterById(details_dto.fighter2_id);
    const winner_entity: Optional<FighterDBEntity> = details_dto.winner_id
      ? await this.findFighterById(details_dto.winner_id)
      : undefined;
    const fight_to_save = FightMapper.fromDetailsDTO(
      event_entity,
      fighter1_entity,
      fighter2_entity,
      details_dto,
      winner_entity,
    );
    this.logger.log(
      `➕ ${FightTypeOrmRepositoryAdapter.entity_name} to save: ${toPrettyJsonString(fight_to_save)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const saved_fight = await this.repository.save(fight_to_save);
    this.logger.log(
      `➕ Saved ${FightTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(saved_fight)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    return FightMapper.fromDBEntity(saved_fight);
  }

  public async delete(params: FightFilterParamsDTO): Promise<Nullable<FightDTO> | void> {
    this.logger.log(
      `⛔ ${FightTypeOrmRepositoryAdapter.entity_name} id to delete: ${toPrettyJsonString(params.id)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    await this.repository.delete({ id: params.id });
    this.logger.log(
      `⛔ ${FightTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(params.id)} deleted`,
      FightTypeOrmRepositoryAdapter.name
    );
  }

  public async findOneBy(params: FightFilterParamsDTO): Promise<Nullable<FightDTO>> {
    this.logger.log(
      `🔎 Searching ${FightTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(params.id)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const fight_entity: FightDBEntity = await this.findFightById(params.id);
    if (!!fight_entity) {
      this.logger.log(
        `🔎 Found ${FightTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(fight_entity)}`,
        FightTypeOrmRepositoryAdapter.name
      );
      return FightMapper.fromDBEntity(fight_entity);
    }
    this.logger.warn(
      `🔎 The ${FightTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(params.id)} was not found`,
      FightTypeOrmRepositoryAdapter.name
    );
    return null;
  }

  public async exists(id: number): Promise<boolean> {
    this.logger.log(
      `🔎 Searching ${FightTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(id)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const fight_dto: FightDTO = await this.findOneBy( { id });
    const exists = !!fight_dto;
    if (exists) {
      this.logger.log(
        `🔎 The ${FightTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} exists`,
        FightTypeOrmRepositoryAdapter.name
      );
    } else {
      this.logger.warn(
        `🔎 The ${FightTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} does not exist`,
        FightTypeOrmRepositoryAdapter.name
      );
    }
    return exists;
  }

  public async update(fight_with_updates: FightDTO): Promise<FightDTO> {
    this.logger.log(
      `📝  The ${FightTypeOrmRepositoryAdapter.entity_name} updates: ${toPrettyJsonString(fight_with_updates)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const event_entity = await this.findEventById(fight_with_updates.event_id);
    const fighter1_entity: FighterDBEntity = await this.findFighterById(fight_with_updates.fighter1_id);
    const fighter2_entity: FighterDBEntity = await this.findFighterById(fight_with_updates.fighter2_id);
    const winner_entity: Optional<FighterDBEntity> = fight_with_updates.winner_id
      ? await this.findFighterById(fight_with_updates.winner_id)
      : undefined;
    const fight_to_save: FightDBEntity = FightMapper.fromDTO(
      event_entity,
      fighter1_entity,
      fighter2_entity,
      fight_with_updates,
      winner_entity,
    );
    await this.repository.save(fight_to_save);
    const updated_fight = await this.findOneBy({ id: fight_with_updates.id });
    this.logger.log(
      `📝  The ${FightTypeOrmRepositoryAdapter.entity_name} updated: ${toPrettyJsonString(updated_fight)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    return updated_fight;
  }

  public async findAll(params: FightsFilterParamsDTO): Promise<Array<FightDTO>> {
    this.logger.log(
      `🔎 The ${FightTypeOrmRepositoryAdapter.entity_name}s filter params: ${toPrettyJsonString(params)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const foundEntities: Array<FightDBEntity> = await this.findAllByFilterParams(params);
    this.logger.log(
      `🔎 The following ${FightTypeOrmRepositoryAdapter.entity_name}s were found: ${toPrettyJsonString(foundEntities)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    return foundEntities.map((entity) => FightMapper.fromDBEntity(entity));
  }

  private async findFightById(fight_id: number): Promise<FightDBEntity> {
    return await this.repository
      .createQueryBuilder(entity_alias)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.event}`, entity_fields.event)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.fighter1}`, entity_fields.fighter1)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.fighter2}`, entity_fields.fighter2)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.winner}`, entity_fields.winner)
      .where(`${entity_alias}.${entity_fields.id} = :${entity_fields.id}`, { id: fight_id })
      .getOne();
  }

  private async findFighterById(fighter_id: number): Promise<FighterDBEntity> {
    return await this.fighter_repository
      .createQueryBuilder(fighter_alias)
      .leftJoinAndSelect(
        `${fighter_alias}.${fighter_fields.stats.alias}`,
        fighter_fields.stats.alias
      )
      .where(
        `${fighter_alias}.${fighter_fields.id} = :${fighter_fields.id}`,
        { id: fighter_id }
      )
      .getOne();
  }

  private async findEventById(event_id: number): Promise<EventDBEntity> {
    return await this.event_repository.findOneBy({
      id: event_id
    });
  }

  private async findAllByFilterParams(
    { event_id, fighter_id, winner_id }: FightsFilterParamsDTO
  ): Promise<Array<FightDBEntity>> {
    const query_builder = this.repository.createQueryBuilder(entity_alias)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.event}`, entity_fields.event)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.fighter1}`, entity_fields.fighter1)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.fighter2}`, entity_fields.fighter2)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.winner}`, entity_fields.winner);
    const id_field = 'id';
    if (event_id) {
      query_builder.orWhere(`${entity_fields.event}.${id_field} = :${id_field}`,
        { id: event_id }
      );
    }
    if (fighter_id) {
      query_builder.orWhere(
        `(${entity_fields.fighter1}.${id_field} = :${id_field} OR ${entity_fields.fighter2}.${id_field} = :${id_field})`,
        { id: fighter_id }
      );
    }
    if (winner_id) {
      query_builder.orWhere(`${entity_fields.winner}.${id_field} = :${id_field}`, { winner_id: winner_id });
    }
    return await query_builder.getMany();
  }
}
