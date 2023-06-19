import {
  QueryEntitiesGateway,
  QueryEntitiesInputPort,
  QueryEntitiesInteractor, QueryEntitiesOutputPort
} from '@core/domain/fighting/use_case/query_entities';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';

export default class QueryEntitiesService<EntityFilterParamsDTO, EntityDTO>
  implements QueryEntitiesInteractor<EntityFilterParamsDTO, EntityDTO> {

  constructor(
    private readonly gateway: QueryEntitiesGateway<EntityFilterParamsDTO, EntityDTO>,
    private readonly entity_name: EntityName,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: QueryEntitiesInputPort<EntityFilterParamsDTO>): Promise<QueryEntitiesOutputPort<EntityDTO>> {
    this.logger.log(
      `➕ Entity filter parameters: ${toPrettyJsonString(input)}`,
      `Query${this.entity_name}sService`
    );
    const entities = await this.gateway.findAll(input.filter_params);
    this.logger.log(
      `➕ Entities: ${toPrettyJsonString(entities)}`,
      `Query${this.entity_name}sService`
    );
    return { entities };
  }
}
