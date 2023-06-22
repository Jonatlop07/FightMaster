import { CoreLogger } from '@core/abstraction/logging';
import {
  UpdateEntityGateway,
  UpdateEntityInputPort,
  UpdateEntityInteractor, UpdateEntityOutputPort
} from '@core/domain/fighting/use_case/update_entity';
import { EntityName } from '@core/domain/fighting/entity/enum';
import { toPrettyJsonString } from '@core/abstraction/format';
import CoreAssert from '@core/abstraction/assert';
import { IdentifiableDTO } from '@core/abstraction/type';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';

export default class UpdateEntityService<EntityDTO extends IdentifiableDTO>
  implements UpdateEntityInteractor<EntityDTO> {

  constructor(
    private readonly gateway: UpdateEntityGateway<EntityDTO>,
    private readonly entity_name: EntityName,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: UpdateEntityInputPort<EntityDTO>): Promise<UpdateEntityOutputPort<EntityDTO>> {
    this.logger.log(
      `📝 ${this.entity_name} to update: ${toPrettyJsonString(input)}`,
      `Update${this.entity_name}Service`
    );
    const { id } = input.entity_with_updates;
    CoreAssert.isTrue(
      await this.gateway.exists(id),
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: `${this.entity_name} not found.`
      })
    );
    const updated_entity = await this.gateway.update(input.entity_with_updates);
    this.logger.log(
      `📝 Updated ${this.entity_name}: ${toPrettyJsonString(updated_entity)}`,
      `Update${this.entity_name}Service`
    );
    return {
      updated_entity
    };
  }
}
