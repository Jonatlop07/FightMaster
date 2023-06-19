import { CoreLogger } from '@core/abstraction/logging';
import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityInteractor, CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { toPrettyJsonString } from '@core/abstraction/format';

export default class CreateEntityService<EntityDetailsDTO, EntityDTO>
  implements CreateEntityInteractor<EntityDetailsDTO, EntityDTO> {

  constructor(
    private readonly gateway: CreateEntityGateway<EntityDetailsDTO, EntityDTO>,
    private readonly entity_name: EntityName,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: CreateEntityInputPort<EntityDetailsDTO>): Promise<CreateEntityOutputPort<EntityDTO>> {
    this.logger.log(
      `➕ ${this.entity_name} to create: ${toPrettyJsonString(input)}`,
      `Create${this.entity_name}Service`
    );
    const created_entity = await this.gateway.create(input.entity_details);
    this.logger.log(
      `➕ Created ${this.entity_name}: ${toPrettyJsonString(created_entity)}`,
      `Create${this.entity_name}Service`
    );
    return { created_entity };
  }
}
