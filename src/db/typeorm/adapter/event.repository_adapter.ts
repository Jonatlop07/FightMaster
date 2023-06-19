import { EventRepository } from '@core/domain/fighting/repository';
import { EventFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { Pagination } from '@core/abstraction/persistence';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { InjectRepository } from '@nestjs/typeorm';
import EventDBEntity from '@db/typeorm/entity/event';
import { CoreLogger } from '@core/abstraction/logging';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { EventTypeOrmRepository } from '@db/typeorm/repository';

export class EventTypeOrmRepositoryAdapter implements EventRepository {
  constructor(
    @InjectRepository(EventDBEntity)
    private readonly repository: EventTypeOrmRepository,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {}

  public async findAll(
    params: EventFilterParamsDTO,
    pagination: Pagination | undefined): Promise<Array<EventDTO>> {
    return await this.repository.find();
  }
}
