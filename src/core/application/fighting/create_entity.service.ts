import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import { Inject } from '@nestjs/common';
import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityInteractor, CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';
import { EntityNames } from '@core/domain/fighting/entity/entity_names';

export default class CreateEntityService<EntityDetailsDTO, EntityDTO>
  implements CreateEntityInteractor<EntityDetailsDTO, EntityDTO> {

  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    private readonly gateway: CreateEntityGateway<EntityDetailsDTO, EntityDTO>,
    private readonly entity_name: EntityNames,
  ) {}

  public async execute(input: CreateEntityInputPort<EntityDetailsDTO>): Promise<CreateEntityOutputPort<EntityDTO>> {
    this.logger.debug(`➕ Executing with params ${input}`, `Create${this.entity_name}Service`);
    const created_entity = await this.gateway.create(input.entity_details);
    return { created_entity };
  }
}
