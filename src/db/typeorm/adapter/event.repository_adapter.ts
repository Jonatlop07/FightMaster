import { InjectRepository } from '@nestjs/typeorm';
import { CoreLogger } from '@core/abstraction/logging';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import EventDBEntity from '@db/typeorm/entity/event';
import { EventDetailsDTO } from '@core/domain/fighting/dto/details';
import { toPrettyJsonString } from '@core/abstraction/format';
import { Nullable } from '@core/abstraction/type';
import { EventRepository } from '@core/domain/fighting/repository';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { EventFilterParamsDTO, EventsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { EventMapper } from '@db/typeorm/mapper/event.mapper';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { Repository } from 'typeorm';

export class EventTypeOrmRepositoryAdapter implements EventRepository {
  private static readonly entity_name: string =  EntityName.Event;

  constructor(
    @InjectRepository(EventDBEntity)
    private readonly repository: Repository<EventDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {
  }

  public async create(details_dto: EventDetailsDTO): Promise<EventDTO> {
    const event_to_save = EventMapper.fromDetailsDTO(details_dto);
    this.logger.log(
      `➕ ${EventTypeOrmRepositoryAdapter.entity_name} to save: ${toPrettyJsonString(event_to_save)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    const saved_event = await this.repository.save(event_to_save);
    this.logger.log(
      `➕ Saved ${EventTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(saved_event)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    return EventMapper.fromDBEntity(saved_event);
  }

  public async delete(params: EventFilterParamsDTO): Promise<Nullable<EventDTO> | void> {
    this.logger.log(
      `⛔ ${EventTypeOrmRepositoryAdapter.entity_name} id to delete: ${toPrettyJsonString(params.id)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    await this.repository.delete({ id: params.id });
    this.logger.log(
      `⛔ ${EventTypeOrmRepositoryAdapter.entity_name} with id ${toPrettyJsonString(params.id)} deleted`,
      EventTypeOrmRepositoryAdapter.name
    );
  }

  public async findOneBy(params: EventFilterParamsDTO): Promise<Nullable<EventDTO>> {
    this.logger.log(
      `🔎 Searching ${EventTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(params.id)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    const event_entity: EventDBEntity = await this.repository.findOneBy( {
      id: params.id,
    });
    if (!!event_entity) {
      this.logger.log(
        `🔎 Found ${EventTypeOrmRepositoryAdapter.entity_name}: ${toPrettyJsonString(event_entity)}`,
        EventTypeOrmRepositoryAdapter.name
      );
      return EventMapper.fromDBEntity(event_entity);
    }
    this.logger.warn(
      `🔎 The ${EventTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(params.id)} was not found`,
      EventTypeOrmRepositoryAdapter.name
    );
    return null;
  }

  public async exists(id: number): Promise<boolean> {
    this.logger.log(
      `🔎 Searching ${EventTypeOrmRepositoryAdapter.entity_name} by id: ${toPrettyJsonString(id)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    const event_dto: EventDTO = await this.findOneBy( { id });
    const exists = !!event_dto;
    if (exists) {
      this.logger.log(
        `🔎 The ${EventTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} exists`,
        EventTypeOrmRepositoryAdapter.name
      );
    } else {
      this.logger.warn(
        `🔎 The ${EventTypeOrmRepositoryAdapter.entity_name} with id: ${toPrettyJsonString(id)} does not exist`,
        EventTypeOrmRepositoryAdapter.name
      );
    }
    return exists;
  }

  public async update(event_with_updates: EventDTO): Promise<EventDTO> {
    this.logger.log(
      `📝  The ${EventTypeOrmRepositoryAdapter.entity_name} updates: ${toPrettyJsonString(event_with_updates)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    const updated_event: EventDBEntity = await this.repository.save(
      EventMapper.fromDTO(event_with_updates)
    );
    this.logger.log(
      `📝  The ${EventTypeOrmRepositoryAdapter.entity_name} updated: ${toPrettyJsonString(updated_event)}`,
      EventTypeOrmRepositoryAdapter.name
    );
    return EventMapper.fromDBEntity(updated_event);
  }

  public async findAll(
    params: EventsFilterParamsDTO,
  ): Promise<Array<EventDTO>> {
    const entity_alias = 'event';
    const entity_fields = {
      id: 'id',
      name: 'name',
      location: 'location',
      date: 'date',
    };
    this.logger.log(
      `🔎 The ${EventTypeOrmRepositoryAdapter.entity_name}s filter params: ${toPrettyJsonString(params)} exists`,
      EventTypeOrmRepositoryAdapter.name
    );
    const queryBuilder = this.repository.createQueryBuilder(entity_alias);
    if (params.name) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.name} = :${entity_fields.name}`,
        { name: params.name }
      );
    }
    if (params.location) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.location} = :${entity_fields.location}`,
        { location: params.location }
      );
    }
    if (params.date) {
      queryBuilder.orWhere(
        `${entity_alias}.${entity_fields.date} = :${entity_fields.date}`,
        { date: params.date }
      );
    }
    if (params.pagination) {
      queryBuilder.skip(params.pagination.offset).take(params.pagination.limit);
    }
    const found_entities: Array<EventDBEntity> = await queryBuilder.getMany();
    this.logger.log(
      `🔎 The following ${EventTypeOrmRepositoryAdapter.entity_name}s were found: ${toPrettyJsonString(found_entities)} exists`,
      EventTypeOrmRepositoryAdapter.name
    );
    return found_entities.map((entity) => EventMapper.fromDBEntity(entity));
  }
}

