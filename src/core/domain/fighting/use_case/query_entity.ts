import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FindOne } from '@core/abstraction/persistence';

interface QueryEntityInputPort<EntityFilterParamsDTO> extends InputPort {
  filter_params: EntityFilterParamsDTO;
}

interface QueryEntityOutputPort<EntityDTO> extends OutputPort {
  entity: EntityDTO;
}

interface QueryEntityInteractor<EntityFilterParamsDTO, EntityDTO>
  extends Interactor<
    QueryEntityInputPort<EntityFilterParamsDTO>,
    QueryEntityOutputPort<EntityDTO>
    > {}

interface QueryEntityGateway<EntityFilterParamsDTO, EntityDTO>
  extends FindOne<EntityFilterParamsDTO, EntityDTO> {}

export {
  QueryEntityInputPort,
  QueryEntityOutputPort,
  QueryEntityInteractor,
  QueryEntityGateway,
};
