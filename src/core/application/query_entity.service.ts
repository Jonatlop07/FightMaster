import {
  QueryEntityGateway,
  QueryEntityInputPort,
  QueryEntityInteractor,
  QueryEntityOutputPort
} from '@core/domain/fighting/use_case/query_entity';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';

export default class QueryEntityService<EntityFilterParamsDTO, EntityDTO>
  implements QueryEntityInteractor<EntityFilterParamsDTO, EntityDTO> {

  constructor(
    private readonly gateway: QueryEntityGateway<EntityFilterParamsDTO, EntityDTO>,
    private readonly entity_name: EntityName,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: QueryEntityInputPort<EntityFilterParamsDTO>): Promise<QueryEntityOutputPort<EntityDTO>> {
    this.logger.log(
      `🔎 ${this.entity_name} filter parameters: ${toPrettyJsonString(input)}`,
      `Query${this.entity_name}sService`
    );
    const entity = await this.gateway.findOneBy(input.filter_params);
    CoreAssert.notEmpty(
      entity,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: `${this.entity_name} not found.`
      })
    );
    this.logger.log(
      `🔎 ${this.entity_name}: ${toPrettyJsonString(entity)}`,
      `Query${this.entity_name}sService`
    );
    return { entity };
  }
}
