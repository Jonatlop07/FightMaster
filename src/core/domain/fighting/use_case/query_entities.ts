import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FindAll } from '@core/abstraction/persistence';

interface QueryEntitiesInputPort<EntityFilterParamsDTO> extends InputPort {
  filter_params: EntityFilterParamsDTO;
}

interface QueryEntitiesOutputPort<EntityDTO> extends OutputPort {
  entities: Array<EntityDTO>;
}

interface QueryEntitiesInteractor<EntityFilterParamsDTO, EntityDTO>
  extends Interactor<
    QueryEntitiesInputPort<EntityFilterParamsDTO>,
    QueryEntitiesOutputPort<EntityDTO>
    > {}

interface QueryEntitiesGateway<EntityFilterParamsDTO, EntityDTO>
  extends FindAll<EntityFilterParamsDTO, EntityDTO> {}

export {
  QueryEntitiesInputPort,
  QueryEntitiesOutputPort,
  QueryEntitiesInteractor,
  QueryEntitiesGateway,
};
