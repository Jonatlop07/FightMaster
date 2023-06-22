import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import { FightDTO, FighterStatsDTO } from '@core/domain/fighting/dto/dto';
import {
  FighterStatsFilterParamsDTO,
  FightFilterParamsDTO,
  FightsFilterParamsDTO
} from '@core/domain/fighting/dto/filter_params';
import { Nullable } from '@core/abstraction/type';
import FightDBEntity from '@db/typeorm/entity/fight';
import { CoreLogger } from '@core/abstraction/logging';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { toPrettyJsonString } from '@core/abstraction/format';
import { FightMapper } from '@db/typeorm/mapper/fight.mapper';
import { EntityName, FightWinMethod } from '@core/domain/fighting/entity/enum';
import { FightRepository } from '@core/domain/fighting/repository';

const entity_alias = 'fight';
const entity_fields = {
  id: 'id',
  event: 'event',
  fighter1: 'fighter1',
  fighter2: 'fighter2',
  winner: 'winner',
  win_method: 'winMethod',
  fighter1_id: 'fighter1Id',
  fighter2_id: 'fighter2Id',
  winner_id: 'winnerId',
};
const win_method_alias = 'win_method';
const fighter_id_alias = 'fighter_id';
const count_alias = 'count';

export class FightTypeOrmRepositoryAdapter implements FightRepository {
  private static readonly entity_name: string =  EntityName.Fight;

  constructor(
    @InjectRepository(FightDBEntity)
    private readonly repository: Repository<FightDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {
  }

  public async create(details_dto: FightDetailsDTO): Promise<FightDTO> {
    const fight_to_save = FightMapper.fromDetailsDTO(details_dto);
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

  public async partialUpdate(previous: FightDTO, next: Partial<FightDTO>): Promise<FightDTO> {
    this.logger.log(
      `📝  The ${FightTypeOrmRepositoryAdapter.entity_name} updates: ${toPrettyJsonString(next)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const fight_to_save: FightDBEntity = FightMapper.fromDTO(
      {
        id: previous.id,
        fighter1: previous.fighter1,
        fighter2: previous.fighter2,
        event: previous.event,
        winner: next.winner,
        win_method: next.win_method
      }
    );
    const updated_fight = await this.repository.save(fight_to_save);
    this.logger.log(
      `📝  The ${FightTypeOrmRepositoryAdapter.entity_name} updated: ${toPrettyJsonString(updated_fight)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    return FightMapper.fromDBEntity(updated_fight);
  }

  public async findAll(params: FightsFilterParamsDTO): Promise<Array<FightDTO>> {
    this.logger.log(
      `🔎 The ${FightTypeOrmRepositoryAdapter.entity_name}s filter params: ${toPrettyJsonString(params)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    const found_fights: Array<FightDBEntity> = await this.findAllByFilterParams(params);
    this.logger.log(
      `🔎 The following ${FightTypeOrmRepositoryAdapter.entity_name}s were found: ${toPrettyJsonString(found_fights)}`,
      FightTypeOrmRepositoryAdapter.name
    );
    return found_fights.map((fight_entity) => FightMapper.fromDBEntity(fight_entity));
  }

  public async queryFighterStats(params: FighterStatsFilterParamsDTO): Promise<FighterStatsDTO> {
    const win_method_counts = await this.getWinMethodCounts(params.id);
    const losses = await this.getLossCounts(params.id);
    const wins = win_method_counts.length;
    const { knockouts, tech_knockouts, submissions, by_decision } = win_method_counts.reduce(
      (win_methods, win_method_counts) => {
        const win_method = win_method_counts[win_method_alias] as FightWinMethod;
        const counts = Number(win_method_counts[count_alias]);
        this.logger.log(toPrettyJsonString({
          win_method,
          counts
        }), FightTypeOrmRepositoryAdapter.name)
        switch (win_method) {
          case FightWinMethod.Knockout:
            return { ...win_methods, knockouts: counts };
          case FightWinMethod.TechnicalKnockout:
            return { ...win_methods, tech_knockouts: counts };
          case FightWinMethod.Submission:
            return { ...win_methods, submissions: counts };
          case FightWinMethod.ByDecision:
            return { ...win_methods, by_decision: counts };
        }
      },
      {
        knockouts: 0,
        tech_knockouts: 0,
        submissions: 0,
        by_decision: 0,
      }
    );
    return {
      fighter_id: params.id,
      wins,
      losses,
      knockouts,
      tech_knockouts,
      by_decision,
      submissions
    };
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
      query_builder.orWhere(`${entity_fields.winner}.${id_field} = :${id_field}`, { winner_id });
    }
    return await query_builder.getMany();
  }

  private async getWinMethodCounts(fighter_id: number) {
    return await this.repository.createQueryBuilder(entity_alias)
      .select(`${entity_alias}.${entity_fields.win_method}`, win_method_alias)
      .addSelect('COUNT(*)', count_alias)
      .where(
        `${entity_alias}.${entity_fields.winner_id} = :${fighter_id_alias}`,
        { fighter_id }
      )
      .groupBy(win_method_alias)
      .getRawMany();
  }

  public async getLossCounts(fighter_id: number) {
    return await this.repository.createQueryBuilder(entity_alias)
      .where(
        `(${entity_alias}.${entity_fields.fighter1_id} = :${fighter_id_alias}
        OR ${entity_alias}.${entity_fields.fighter2_id} = :${fighter_id_alias})`
      )
      .andWhere(`${entity_alias}.${entity_fields.winner_id} != :${fighter_id_alias}`, { fighter_id })
      .getCount();
  }
}
