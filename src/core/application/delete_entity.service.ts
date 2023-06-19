import {
  DeleteEntityGateway,
  DeleteEntityInputPort,
  DeleteEntityInteractor,
  DeleteEntityOutputPort
} from '@core/domain/fighting/use_case/delete_entity';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';

export default class DeleteEntityService<EntityFilterParamsDTO, EntityDTO>
  implements DeleteEntityInteractor<EntityFilterParamsDTO, EntityDTO> {

  constructor(
    private readonly gateway: DeleteEntityGateway<EntityFilterParamsDTO, EntityDTO>,
    private readonly entity_name: EntityName,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: DeleteEntityInputPort<EntityFilterParamsDTO>): Promise<DeleteEntityOutputPort<EntityDTO>> {
    this.logger.log(
      `⛔ ${this.entity_name} filter parameters: ${toPrettyJsonString(input)}`,
      `Delete${this.entity_name}sService`
    );
    const deleted_entity = await this.gateway.findOneBy(input.filter_params);
    await this.gateway.delete(input.filter_params);
    this.logger.log(
      `⛔ Deleted ${this.entity_name}: ${toPrettyJsonString(deleted_entity)}`,
      `Delete${this.entity_name}sService`
    );
    return { deleted_entity };
  }
}
